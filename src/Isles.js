import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";

export default class Isles extends Component {
  render() {
    return (
      <React.Fragment>
        <ItemList />
        <ArchivedList />
      </React.Fragment>
    );
  }
}
