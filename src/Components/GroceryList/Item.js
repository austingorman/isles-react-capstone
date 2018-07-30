import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

export default class Item extends Component {
  state = { toggleEditForms: [] };

  formLauncher = () => {
    if (this.state.toggleEditForms === "") {
      this.setState({
        // <form onSubmit={this.editItem}>
        toggleEditForms: (
          <form onSubmit={this.editItem}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Quantity"
                  // className={classes.textField}
                  // helperText="Quantity"
                  // margin="normal"
                  className="quantityForm"
                  name="editQuantity"
                  type="number"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Item Name"
                  // defaultValue="Default Value"
                  className="itemForm"
                  name="editItem"
                  type="text"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Aisle"
                  defaultValue="Default Value"
                  className="aisleForm"
                  name="editAisle"
                  type="number"
                />
              </div>
            </div>
            <div className="inputForms">
              <Button
                variant="contained"
                color="primary"
                id="editSubmitItemButton"
                type="submit"
              >
                Submit
              </Button>
            </div>
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
            color="primary"
            id="editButton"
            type="edit"
            onClick={this.formLauncher}
          >
            <Icon>edit</Icon>
          </Button>
          {this.state.toggleEditForms}
        </li>
      );
    } else {
      return null;
    }
  }
}
