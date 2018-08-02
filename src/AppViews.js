import React, { Component } from "react";
import StoreList from "./Components/Stores/StoreList";
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
    store: [],
    selectedStore: "",
    item: [],
    user: []
  };

  setItemState = () => {
    APIManager.getAll("items?_sort=aisle").then(items => {
      this.setState({
        item: items,
        archivedItem: items
      });
    });
  };
  setStoreState = () => {
    APIManager.getAll("stores").then(stores => {
      this.setState({ store: stores });
    });
  };

  changeStores = storeId => {
    // / event.preventDefault();
    console.log(storeId);
    this.setState({ itemDisplay: "store", selectedStore: storeId });
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
          store={this.state.store}
          item={this.state.item}
          changeStores={this.changeStores}
        />
        <Route
          exact
          path="/"
          render={state => {
            return (
              <ItemList
                setTheState={this.setItemState}
                item={this.state.item}
                store={this.state.store}
              />
            );
          }}
        />
        <Route
          path="/shoppinglist"
          render={state => {
            return (
              <ItemList
                setTheState={this.setItemState}
                item={this.state.item}
                selectedStore={this.state.selectedStore}
                itemDisplay={this.state.itemDisplay}
              />
            );
          }}
        />
        <Route
          path="/archive"
          render={state => {
            return (
              <ArchivedList
                setTheState={this.setItemState}
                archivedItem={this.state.archivedItem}
                store={this.state.store}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
