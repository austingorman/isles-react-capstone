import React, { Component } from "react";

export default class Item extends Component {
  render() {
    return (
      <div className="groceryItems">
        <input
          type="checkbox"
          checked={this.props.item.archived}
          onChange={() => this.props.archiver(this.props.item.id)}
        />
        <h5 className="groceryItem">{this.props.item.quantity}</h5>
        <h5 className="groceryItem">{this.props.item.name}</h5>
        <h5 className="groceryItem">{this.props.item.aisle}</h5>
        <button id="editButton" type="edit">
          Edit
        </button>
      </div>
    );
  }
}
