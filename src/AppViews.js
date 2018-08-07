import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";
import Home from "./Components/Home";
import APIManager from "./APIManager";
import HeaderAndNav from "./HeaderAndNav";
import Auth from "./Components/Auth/Auth";
import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
import { Route } from "react-router-dom";

export default class AppViews extends Component {
  state = {
    itemDisplay: "store",
    archiveDisplay: "store",
    store: [],
    selectedStore: "",
    selectedStoreName: "",
    item: [],
    user: [],
    newStoreName: ""
  };

  setItemState = () => {
    APIManager.getAll("items?_sort=aisle&_order=asc").then(items => {
      console.log(items, "items");

      this.setState({ item: items });
    });
  };
  setStoreState = () => {
    APIManager.getAll("stores").then(stores => {
      this.setState({ store: stores });
    });
  };

  changeStores = (storeId, storeName) => {
    // / event.preventDefault();
    this.setState({
      itemDisplay: "store",
      selectedStore: storeId,
      selectedStoreName: storeName
    });
  };

  handleFieldChange = evt => {
    const stateToChange = { ...this.state };
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(this.state);
  };

  editStoreName = id => {
    const updatedItem = this.state.newStoreName;
    return APIManager.editStoreName(id, updatedItem).then(() => {
      APIManager.getAll("stores").then(stores =>
        this.setState({
          store: stores,
          newStoreName: ""
        })
      );
    });
  };

  setNewStoreName = storeName => {
    this.setState({ newStoreName: storeName });
  };
  render() {
    // const auth = new Auth();
    // auth.login();
    return (
      <React.Fragment>
        <HeaderAndNav
          setStoreState={this.setStoreState}
          handleFieldChange={this.handleFieldChange}
          editStoreName={this.editStoreName}
          setTheState={this.setItemState}
          archivedItem={this.state.archivedItem}
          selectedStore={this.state.selectedStore}
          selectedStoreName={this.state.selectedStoreName}
          store={this.state.store}
          item={this.state.item}
          changeStores={this.changeStores}
          setNewStoreName={this.setNewStoreName}
        />
        <Route
          exact
          path="/"
          render={props => {
            return <Home />;
          }}
        />
        <Route
          path="/shoppinglist"
          render={props => {
            return (
              <ItemList
                setTheState={this.setItemState}
                item={this.state.item}
                selectedStore={this.state.selectedStore}
                itemDisplay={this.state.itemDisplay}
                archiver={this.archiver}
              />
            );
          }}
        />
        <Route
          path="/archive"
          render={props => {
            return (
              <ArchivedList
                setTheState={this.setItemState}
                item={this.state.item}
                selectedStore={this.state.selectedStore}
                unarchiver={this.unarchiver}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
