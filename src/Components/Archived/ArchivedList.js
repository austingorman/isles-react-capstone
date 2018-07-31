import React, { Component } from "react";
import ArchivedItem from "../Archived/ArchivedItem";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";

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
      <ul className="archivedItems">
        <div id="archiveHeader">
          <h4>Archive</h4>
        </div>
        {this.props.archivedItem.map(archivedItem => (
          <ArchivedItem
            key={archivedItem.id}
            archivedItem={archivedItem}
            unarchiver={this.unarchiver}
            setTheState={this.props.setTheState}
          />
        ))}
      </ul>
    );
  }
}
