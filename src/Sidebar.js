import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
import Divider from "@material-ui/core/Divider";
import StoreList from "./Components/Stores/StoreList";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="navSwipeBar">
        {isLoggedIn() ? <Link to="/">Item List</Link> : ""}
        {isLoggedIn() ? (
          <button className="sidebar" onClick={() => logout()}>
            Log out
          </button>
        ) : (
          <button className="sidebar" onClick={() => login()}>
            Log In
          </button>
        )}
        <StoreList
          setStoreState={this.props.setStoreState}
          toggleDrawer={this.props.toggleDrawer}
          store={this.props.store}
          user={this.props.user}
          setTheState={this.props.setItemState}
          archivedItem={this.props.archivedItem}
          item={this.props.item}
          changeStores={this.props.changeStores}
        />
      </div>
    );
  }
}
