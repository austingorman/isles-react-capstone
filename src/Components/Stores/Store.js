import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

export default class Store extends Component {
  state = { toggleEditForms: [] };
  deleter = (deleter, id) => {
    APIManager.deleter(deleter, id).then(store => {
      this.props.setStoreState({
        store: store
      });
    });
  };

  updateStoreName = e => {
    e.preventDefault();
    // const updatedItem = this.props.newStoreName;
    this.props.editStoreName(this.props.store.id).then(
      this.setState({
        toggleEditForms: ""
      })
    );
  };

  formLauncher = () => {
    if (this.state.toggleEditForms === "") {
      this.setState({
        toggleEditForms: (
          <form onSubmit={this.updateStoreName}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  defaultValue={this.props.store.name}
                  onChange={this.props.handleFieldChange}
                  className="name"
                  type="text"
                  id="newStoreName"
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              id="submitItemButton"
              type="submit"
              onClick={this.props.setNewStoreName(this.props.store.name)}
            >
              Submit
            </Button>
          </form>
        )
      });
    } else {
      this.setState({ toggleEditForms: "" });
    }
  };
  render() {
    return (
      <li>
        <div className="store">
          <Button
            className="deleteStoresButton"
            type="submit"
            onClick={() => this.deleter("stores", this.props.store.id)}
          >
            <Icon>delete_forever</Icon>
          </Button>
          <div
            onClick={this.props.toggleDrawer("left", false)}
            className="changeStoresButton"
          >
            <Link to="/shoppingList" className="changeStoresButton">
              <Button
                onClick={() => {
                  this.props.changeStores(
                    this.props.store.id,
                    this.props.store.name
                  );
                }}
                onKeyDown={this.props.toggleDrawer("left", false)}
              >
                <h2>{this.props.store.name}</h2>
              </Button>
            </Link>
          </div>
          <Button
            variant="text"
            className="editStoresButton"
            type="sumbit"
            onClick={this.formLauncher}
          >
            <Icon>edit</Icon>
          </Button>
          {this.state.toggleEditForms}
        </div>
      </li>
    );
  }
}
