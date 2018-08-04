import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";
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
    item: [],
    user: []
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

  changeStores = storeId => {
    // / event.preventDefault();
    this.setState({
      itemDisplay: "store",
      selectedStore: storeId
    });
    // APIManager.getStore(storeId)
    //   .then(() => {
    //     return fetch(
    //       `http://localhost:5002/items?storeId=${storeId}&_sort=aisle&_order=desc`
    //     );
    //   })
    //   .then(a => a.json())
    //   .then(items =>
    //     this.setState({
    //       items: items,
    //       archivedItem: items
    //     })
    //   );
  };
  render() {
    // const auth = new Auth();
    // auth.login();
    return (
      <React.Fragment>
        <HeaderAndNav
          setStoreState={this.setStoreState}
          setTheState={this.setItemState}
          archivedItem={this.state.archivedItem}
          selectedStore={this.state.selectedStore}
          store={this.state.store}
          item={this.state.item}
          changeStores={this.changeStores}
        />
        <Route
          exact
          path="/"
          render={props => {
            return (
              <ItemList
                setTheState={this.setItemState}
                item={this.state.item}
                store={this.state.store}
                itemDisplay={this.state.itemDisplay}
                archiver={this.archiver}
              />
            );
          }}
        />
        <Route
          path="/shoppinglist"
          render={props => {
            return (
              <ItemList
                // {...props}
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
                // {...props}
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
