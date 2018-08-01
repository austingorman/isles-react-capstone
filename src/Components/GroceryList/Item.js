import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

export default class Item extends Component {
  state = { toggleEditForms: [] };

  formLauncher = () => {
    if (this.state.toggleEditForms === "") {
      this.setState({
        toggleEditForms: (
          <form onSubmit={this.editItem}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  id="helperText"
                  value={this.props.item.quantity}
                  className="quantityForm"
                  name="editQuantity"
                  type="number"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  value={this.props.item.name}
                  className="itemForm"
                  name="editItem"
                  type="text"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  value={this.props.item.aisle}
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

  editItem = event => {
    event.preventDefault();
    const ItemId = this.props.item.id;
    const Quantity = event.target.editQuantity.value;
    const ItemName = event.target.editItem.value;
    const Aisle = event.target.editAisle.value;
    APIManager.updateItem(ItemId, Quantity, ItemName, Aisle)
      .then(() => {
        return fetch("http://localhost:5002/items");
      })
      .then(a => a.json())
      .then(() => {
        APIManager.getAll("items").then(items =>
          this.props.setTheState({
            item: items
          })
        );
      })
      .then(
        this.setState({
          toggleEditForms: ""
        })
      );
  };

  render() {
    if (this.props.item.archived === false) {
      return (
        <li id="groceryItems">
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
              id="editButton"
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
