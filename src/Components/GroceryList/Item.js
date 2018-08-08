import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

export default class Item extends Component {
  state = {
    toggleEditForms: [],
    quantity: this.props.item.quantity,
    name: this.props.item.name,
    aisle: this.props.item.aisle
  };
  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = { ...this.state };
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
    console.log(this.state);
  };

  editItem = e => {
    e.preventDefault();

    const updatedItem = {
      quantity: this.state.quantity,
      name: this.state.name,
      aisle: this.state.aisle,
      storeId: this.props.storeId
    };
    console.log(this.props, updatedItem);
    APIManager.editItems(this.props.item.id, updatedItem)
      .then(() => {
        this.props.getAllStoreItems();
      })
      .then(
        this.setState({
          toggleEditForms: ""
        })
      );
  };

  formLauncher = () => {
    if (this.state.toggleEditForms === "") {
      this.setState({
        toggleEditForms: (
          <form onSubmit={this.editItem}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  id="quantity"
                  defaultValue={this.state.quantity}
                  onChange={this.handleFieldChange}
                  className="quantityForm"
                  name="editQuantity"
                  type="number"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="name"
                  defaultValue={this.state.name}
                  // defaultValue={this.state.name}
                  onChange={this.handleFieldChange}
                  className="itemForm"
                  name="editItem"
                  type="text"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="aisle"
                  defaultValue={this.state.aisle}
                  onChange={this.handleFieldChange}
                  className="aisleForm"
                  name="editAisle"
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
      this.setState({ toggleEditForms: "" });
    }
  };

  // editItem = event => {
  //   event.preventDefault();
  //   const ItemId = this.props.item.id;
  //   const Quantity = event.target.editQuantity.value;
  //   const ItemName = event.target.editItem.value;
  //   const Aisle = parseInt(event.target.editAisle.value);
  //   debugger;
  //   APIManager.editItems(ItemId, Quantity, ItemName, Aisle, this.props.storeId)
  //     .then(() => {
  //       return fetch("http://localhost:5002/items");
  //     })
  //     .then(a => a.json())
  //     .then(() => {
  //       APIManager.getAll("items?_sort=aisle&_order=asc").then(items =>
  //         this.props.setTheState({
  //           item: items
  //         })
  //       );
  //     })
  //     .then(
  //       this.setState({
  //         toggleEditForms: ""
  //       })
  //     );
  // };

  render() {
    if (this.props.item.archived === false) {
      return (
        <li className="itemContainer">
          <Card>
            <Checkbox
              className="checkBox"
              type="checkbox"
              checked={this.props.item.archived}
              onChange={() => this.props.archiver(this.props.item.id)}
            />
            <h5 className="groceryItem">{this.props.item.quantity}</h5>
            <h5 className="groceryItem">{this.props.item.name}</h5>
            <h5 className="groceryItem">in aisle</h5>
            <h5 className="groceryItem">{this.props.item.aisle}</h5>
            <Button
              variant="text"
              className="editButton"
              type="sumbit"
              onClick={this.formLauncher}
            >
              <Icon>edit</Icon>
            </Button>
            {this.state.toggleEditForms}
          </Card>
        </li>
      );
    } else {
      return null;
    }
  }
}
