import React, { Component } from "react";
import APIManager from "../../APIManager";
import Store from "./Store";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

export default class StoreList extends Component {
  state = {
    toggleStores: ""
  };

  componentDidMount() {
    this.props.setStoreState();
  }

  addNewStore = event => {
    event.preventDefault();
    const StoreName = event.target.storeName.value;

    // const UserID = this.props.user.
    APIManager.postStore(StoreName)
      .then(() => {
        return fetch("http://localhost:5002/stores");
      })
      .then(a => a.json())
      .then(() => {
        APIManager.getAll("stores").then(stores =>
          this.props.setStoreState({
            store: stores
          })
        );
      })
      .then(this.setState({ toggleForms: "" }));
  };
  formLauncher = () => {
    if (this.state.toggleStores === "") {
      this.setState({
        toggleStores: (
          <form onSubmit={this.addNewStore}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Store" // className={classes.textField}
                  // helperText="Quantity"
                  // margin="normal"
                  className="quantityForm"
                  name="storeName"
                  type="text"
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              id="submitItemButton"
              type="submit"
              onClick={this.props.toggleDrawer("left", false)}
              onKeyDown={this.props.toggleDrawer("left", false)}
            >
              Submit
            </Button>
          </form>
        )
      });
    } else {
      this.setState({
        toggleStores: ""
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <div className="sidebar">Stores</div>
        </div>
        <div className="sidebar">
          <Button onClick={this.formLauncher}>
            <Icon> add </Icon>New Store
          </Button>
        </div>
        {this.state.toggleStores}
        <ul>
          {this.props.store.map(store => (
            <Store
              key={store.id}
              store={store}
              setStoreState={this.props.setStoreState}
              setTheState={this.props.setItemState}
              archivedItem={this.props.archivedItem}
              item={this.props.item}
              changeStores={this.props.changeStores}
              toggleDrawer={this.props.toggleDrawer}
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
