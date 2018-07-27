import React, { Component } from "react";

export default class Item extends Component {
  render() {
    return (
      <div>
        <h3 className={"groceryItem"}>{this.props.item.quantity}</h3>
        <h3 className={"groceryItem"}>{this.props.item.name}</h3>
        <h3 className={"groceryItem"}>{this.props.item.aisle}</h3>
      </div>
    );
  }
}
