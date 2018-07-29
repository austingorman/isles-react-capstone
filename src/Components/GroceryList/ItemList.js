import React, { Component } from "react";
import Item from "./Item";
import APIManager from "../../APIManager";

export default class ItemList extends Component {
  state = { toggleForms: "" };

  componentDidMount() {
    this.props.setTheState();
  }

  formLauncher = () => {
    if (this.state.toggleForms === "") {
      this.setState({
        toggleForms: (
          <form onSubmit={this.addNewItem} id="inputForms">
            <div className="inputForm">
              <label>Qty</label>
              <input className="quantityForm" name="quantity" type="number" />
            </div>
            <div className="inputForm">
              <label>Item</label>
              <input className="itemForm" name="item" type="text" />
            </div>
            <div className="inputForm">
              <label>Aisle</label>
              <input className="aisleForm" name="aisle" type="number" />
            </div>
            <button id="submitItemButton" type="submit">
              Submit
            </button>
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
    const Aisle = event.target.aisle.value;
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
            <button id="addItemButton" onClick={this.formLauncher}>
              Add New Grocery Item
            </button>
            {this.state.toggleForms}
          </div>
          <div className="groceryItems">
            {this.props.item.map(item => (
              <Item
                key={item.id}
                item={item}
                archiver={this.archiver}
                setTheState={this.props.setTheState}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
