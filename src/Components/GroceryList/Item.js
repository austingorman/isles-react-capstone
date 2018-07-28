import React, { Component } from "react";
import APIManager from "../../APIManager";

export default class Item extends Component {
  state = { toggleEditForms: [] };

  formLauncher = () => {
    if (this.state.toggleEditForms === "") {
      this.setState({
        toggleEditForms: (
          <form onSubmit={this.editItem}>
            <label>Quantity</label>
            <input className="inputForm" name="editQuantity" type="number" />
            <label>Item</label>
            <input className="inputForm" name="editItem" type="text" />
            <label>Aisle</label>
            <input className="inputForm" name="editAisle" type="text" />
            <button id="submitItemButton" type="submit">
              Submit
            </button>
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
    return (
      <div id="groceryItems">
        <input
          className="checkBox"
          type="checkbox"
          checked={this.props.item.archived}
          onChange={() => this.props.archiver(this.props.item.id)}
        />
        <h5 className="groceryItem">{this.props.item.quantity}</h5>
        <h5 className="groceryItem">{this.props.item.name}</h5>
        <h5 className="groceryItem">in aisle</h5>
        <h5 className="groceryItem">{this.props.item.aisle}</h5>

        <button id="editButton" type="edit" onClick={this.formLauncher}>
          Edit
        </button>
        {this.state.toggleEditForms}
      </div>
    );
  }
}
