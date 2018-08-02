import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Redirect } from "react-router-dom";

export default class Store extends Component {
  deleter = (deleter, id) => {
    APIManager.deleter(deleter, id)
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequenet `then()`
        return fetch(`http://localhost:5002/${deleter}`);
      })
      // Once the new array of animals is retrieved, set the state
      .then(a => a.json())
      .then(store => {
        this.props.setStoreState({
          stores: store
        });
      });
  };

  render() {
    return (
      <li>
        <div id="stores">
          <Button
            id="deleteButton"
            type="submit"
            onClick={() => this.deleter("stores", this.props.store.id)}
          >
            <Icon>delete_forever</Icon>
          </Button>
          <div>
            <Button
              className="stores"
              onClick={() => {
                this.props.changeStores(this.props.store.id);
              }}
            >
              <h3>{this.props.store.name}</h3>
            </Button>
          </div>
        </div>
      </li>
    );
  }
}
