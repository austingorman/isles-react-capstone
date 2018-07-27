import React, { Component } from "react";
import Item from "./Item";
import APIManager from "../../APIManager";

export default class ItemList extends Component {
  state = {
    item: [],
    toggleForms: ""
  };
  componentDidMount() {
    APIManager.getAll("items").then(items =>
      this.setState({
        item: items
      })
    );
  }

  formLauncher = () => {
    if (this.state.toggleForms === "") {
      this.setState({
        toggleForms: (
          <form onSubmit={this.addNewItem}>
            <label>Quantity</label>
            <input id="quantity" name="quantity" type="text" />
            <label>Item</label>
            <input id="item" name="item" type="text" />
            <label>Aisle</label>
            <input id="aisle" name="aisle" type="text" />
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
        APIManager.getAll("items").then(items =>
          this.setState({
            item: items
          })
        );
      })
      .then(
        this.setState({
          toggleForms: ""
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <button id="addItemButton" onClick={this.formLauncher}>
              Add New Grocery Item
            </button>
            {this.state.toggleForms}
          </div>
          <div className="groceryItems">
            {this.state.item.map(item => <Item key={item.id} item={item} />)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
