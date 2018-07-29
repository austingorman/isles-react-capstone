import React, { Component } from "react";
import ArchivedItem from "../Archived/ArchivedItem";
import APIManager from "../../APIManager";

export default class ArchivedList extends Component {
  componentDidMount() {
    this.props.setTheState();
  }

  unarchiver = itemId => {
    // event.preventDefault();
    APIManager.patchItem(itemId, false)
      .then(() => {
        return fetch("http://localhost:5002/items");
      })
      .then(a => a.json())
      .then(() => {
        APIManager.getAll("items").then(items =>
          this.props.setTheState({
            items: items,
            archivedItem: items
          })
        );
      });
  };

  render() {
    return (
      <div className="archivedItems">
        <h2>Archive</h2>
        {this.props.archivedItem.map(archivedItem => (
          <ArchivedItem
            key={archivedItem.id}
            archivedItem={archivedItem}
            unarchiver={this.unarchiver}
          />
        ))}
      </div>
    );
  }
}
