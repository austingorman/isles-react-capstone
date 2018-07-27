import React, { Component } from "react";
import Item from "./Item";
import APIManager from "../../APIManager";

export default class ItemList extends Component {
  state = { item: [] };
  setItemState = () => {
    APIManager.getAll("items").then(items =>
      this.setState({
        item: items
      })
    );
  };
  render() {
    return <h1>Itemlist</h1>;
  }
}
