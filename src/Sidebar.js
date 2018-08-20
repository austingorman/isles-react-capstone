import React, { Component } from "react";
import StoreList from "./Components/Stores/StoreList";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="navSwipeBar">
        {this.props.auth.isAuthenticated() ? (
          <button className="sidebar" onClick={() => this.props.auth.logout()}>
            Log out
          </button>
        ) : (
          <button className="sidebar" onClick={() => this.props.auth.login()}>
            Log In
          </button>
        )}
        <StoreList
          setStoreState={this.props.setStoreState}
          toggleDrawer={this.props.toggleDrawer}
          store={this.props.store}
          user={this.props.user}
          storeNamer={this.props.storeNamer}
          setTheState={this.props.setItemState}
          changeStores={this.props.changeStores}
          handleFieldChange={this.props.handleFieldChange}
          editStoreName={this.props.editStoreName}
          setNewStoreName={this.props.setNewStoreName}
        />
      </div>
    );
  }
}
