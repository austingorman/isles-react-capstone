import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";

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
        <li id="groceryItems">
          <Button
            variant="text"
            color="primary"
            id="deleteButton"
            type="submit"
            onClick={() => this.deleteItem(this.props.archivedItem.id)}
          >
            <Icon>delete_forever</Icon>
          </Button>
          <h5 className="groceryItem">{this.props.archivedItem.quantity}</h5>
          <h5 className="groceryItem">{this.props.archivedItem.name}</h5>
          <h5 className="groceryItem">in aisle</h5>
          <h5 className="groceryItem">{this.props.archivedItem.aisle}</h5>
          <Button
            id="editButton"
            type="submit"
            onClick={() => this.props.unarchiver(this.props.archivedItem.id)}
          >
            <Icon>playlist_add</Icon>
          </Button>
        </li>
      );
    } else {
      return null;
    }
  }
}
