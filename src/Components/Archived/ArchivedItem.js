import React, { Component } from "react";

export default class ArchivedItem extends Component {
  render() {
    if (this.props.archivedItem.archived === true) {
      return (
        <div id="groceryItems">
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
