import React, { Component } from "react";
import Item from "./Item";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

export default class ItemList extends Component {
  state = { toggleForms: "" };

  componentDidMount() {
    this.props.setTheState();
  }

  formLauncher = () => {
    if (this.state.toggleForms === "") {
      this.setState({
        toggleForms: (
          <form onSubmit={this.addNewItem}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Quantity"
                  // className={classes.textField}
                  // helperText="Quantity"
                  // margin="normal"
                  className="quantityForm"
                  name="quantity"
                  type="number"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Item Name"
                  // defaultValue="Default Value"
                  className="itemForm"
                  name="item"
                  type="text"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Aisle"
                  defaultValue="Default Value"
                  className="aisleForm"
                  name="aisle"
                  type="number"
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              id="submitItemButton"
              type="submit"
            >
              Submit
            </Button>
          </form>
        )
      });
    } else {
      this.setState({ toggleForms: "" });
    }
  };

  addNewItem = event => {
    event.preventDefault();
    const Quantity = event.target.quantity.value;
    const ItemName = event.target.item.value;
    const Aisle = parseInt(event.target.aisle.value);
    console.log(typeof Aisle);
    APIManager.postItem(Quantity, ItemName, Aisle, false)
      .then(() => {
        return fetch("http://localhost:5002/items");
      })
      .then(a => a.json())
      .then(() => {
        APIManager.getAll("items?_sort=aisle&_order=asc").then(items =>
          this.props.setTheState({
            item: items
          })
        );
      })
      .then(this.setState({ toggleForms: "" }));
  };

  archiver = itemId => {
    // event.preventDefault();
    APIManager.patchItem(itemId, true)
      .then(() => {
        return fetch("http://localhost:5002/items");
      })
      .then(a => a.json())
      .then(() => {
        APIManager.getAll("items").then(items =>
          this.props.setTheState({
            item: items,
            archivedItem: items
          })
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>🏝 isles 🏝</h1>
          <div>
            <Button
              variant="contained"
              color="primary"
              id="addItemButton"
              onClick={this.formLauncher}
            >
              <Icon>add</Icon>Add New Grocery Item
            </Button>
            {this.state.toggleForms}
          </div>
          <ul id="groceryItemContainer">
            {this.props.item.map(item => (
              <Item
                key={item.id}
                item={item}
                archiver={this.archiver}
                setTheState={this.props.setTheState}
              />
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
