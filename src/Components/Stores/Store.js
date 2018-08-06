import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Redirect, Link } from "react-router-dom";
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
    const updatedItem = this.state.newStoreName;
    this.props.editStoreName(this.props.store.id).then(
      this.setState({
        toggleEditForms: ""
      })
    );
  };
  // handleFieldChange = evt => {
  //   const stateToChange = { ...this.state };
  //   stateToChange[evt.target.id] = evt.target.value;
  //   this.setState(stateToChange);
  //   console.log(this.state);
  // };

  // editStoreName = () => {
  //   // e.preventDefault();
  //   const updatedItem = this.state.name;

  //   APIManager.editStoreName(this.props.store.id, updatedItem)
  //     .then(() => {
  //       APIManager.getAll("stores").then(stores =>
  //         this.props.setStoreState({
  //           store: stores
  //         })
  //       );
  //     })
  //     .then(
  //       this.setState({
  //         toggleEditForms: ""
  //       })
  //     );
  // };

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
        <div id="stores">
          <Button
            id="deleteButton"
            type="submit"
            onClick={() => this.deleter("stores", this.props.store.id)}
          >
            <Icon>delete_forever</Icon>
          </Button>
          <div onClick={this.props.toggleDrawer("left", false)}>
            <Link to="/shoppingList">
              <Button
                className="stores"
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
            className="editButton"
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
