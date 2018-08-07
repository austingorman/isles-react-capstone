import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";

export default class ArchivedItem extends Component {
  deleter = (deleter, id) => {
    APIManager.deleter(deleter, id).then(() => {
      this.props.getAllStoreItems();
    });
  };

  render() {
    if (this.props.archivedItem.archived === true) {
      return (
        <li id="groceryItems">
          <Card>
            <Button
              id="deleteButton"
              type="submit"
              onClick={() => this.deleter("items", this.props.archivedItem.id)}
            >
              <Icon>delete_forever</Icon>
            </Button>
            <h5 className="groceryItem">{this.props.archivedItem.quantity}</h5>
            <h5 className="groceryItem">{this.props.archivedItem.name}</h5>
            <h5 className="groceryItem">in aisle</h5>
            <h5 className="groceryItem">{this.props.archivedItem.aisle}</h5>
            <Button
              className="editButton"
              type="submit"
              onClick={() => this.props.unarchiver(this.props.archivedItem.id)}
            >
              <Icon>playlist_add</Icon>
            </Button>
          </Card>
        </li>
      );
    } else {
      return null;
    }
  }
}
