import React, { Component } from "react";
import APIManager from "../../APIManager";

export default class ArchivedItem extends Component {
  deleteItem = id => {
    APIManager.deleteItem(id)
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequenet `then()`
        return fetch("http://localhost:5002/items");
      })
      // Once the new array of animals is retrieved, set the state
      .then(a => a.json())
      .then(archivedItem => {
        this.props.setTheState({
          archivedItem: archivedItem
        });
      });
  };

  render() {
    if (this.props.archivedItem.archived === true) {
      return (
        <div id="groceryItems">
          <button
            id="deleteButton"
            type="submit"
            onClick={() => this.deleteItem(this.props.archivedItem.id)}
          >
            X
          </button>
          <h5 className="groceryItem">{this.props.archivedItem.quantity}</h5>
          <h5 className="groceryItem">{this.props.archivedItem.name}</h5>
          <h5 className="groceryItem">in aisle</h5>
          <h5 className="groceryItem">{this.props.archivedItem.aisle}</h5>
          <button
            id="editButton"
            type="submit"
            onClick={() => this.props.unarchiver(this.props.archivedItem.id)}
          >
            Add
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}
