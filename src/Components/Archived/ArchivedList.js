import React, { Component } from "react";
import ArchivedItem from "../Archived/ArchivedItem";
import APIManager from "../../APIManager";

export default class ArchivedList extends Component {
  state = { archivedItem: [] };

  componentDidMount() {
    this.setArchivedState();
  }
  setArchivedState = () => {
    APIManager.getAll("items").then(archived =>
      this.setState({
        archivedItem: archived
      })
    );
  };

  unarchiver = itemId => {
    // event.preventDefault();
    APIManager.patchItem(itemId, false)
      .then(() => {
        return fetch("http://localhost:5002/items");
      })
      .then(a => a.json())
      .then(() => {
        APIManager.getAll("items").then(items =>
          this.setState({
            archivedItem: items
          })
        );
      });
  };

  render() {
    return (
      <div className="archivedItems">
        <h2>Archive</h2>
        {this.state.archivedItem.map(archivedItem => (
          <ArchivedItem
            key={archivedItem.id}
            archivedItem={archivedItem}
            unarchiver={this.unarchiver}
            setTheState={this.setArchivedState}
          />
        ))}
      </div>
    );
  }
}
