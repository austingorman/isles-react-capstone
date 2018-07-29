import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";
import APIManager from "./APIManager";

export default class Isles extends Component {
  state = { item: [], archivedItem: [] };

  setItemState = () => {
    APIManager.getAll("items").then(items => {
      this.setState({
        item: items,
        archivedItem: items
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <ItemList setTheState={this.setItemState} item={this.state.item} />
        <ArchivedList
          setTheState={this.setItemState}
          archivedItem={this.state.archivedItem}
        />
      </React.Fragment>
    );
  }
}
