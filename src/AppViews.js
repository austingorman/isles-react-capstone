import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";
import Home from "./Components/Home";
import APIManager from "./APIManager";
import HeaderAndNav from "./HeaderAndNav";
import Auth from "./Components/Auth/Auth";
// import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
import { Route } from "react-router-dom";
import Login from "./Components/Login";

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const auth = new Auth();

const { isAuthenticated } = auth;

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
    let id = localStorage.getItem("userId");
    APIManager.getAll(`stores?userId=${id}`).then(stores => {
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
      let id = localStorage.getItem("userId");
      APIManager.getAll(`stores?userId=${id}`).then(stores =>
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
          isAuthenticated={this.isAuthenticated}
          auth={auth}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Home {...props} />;
          }}
        />
        <Route
          exact
          path="/"
          render={props => {
            if (isAuthenticated()) {
              return <Home />;
            } else {
              return <Home auth={auth} {...props} />;
            }
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
