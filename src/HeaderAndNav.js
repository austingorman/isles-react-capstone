import React, { Component } from "react";
import Nav from "./Nav";
import NavSwipe from "./NavSwipe";
// import SwipeViews from "./SwipeViews";

export default class HeaderAndNav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="tabs">
          <header>
            <NavSwipe
              setStoreState={this.props.setStoreState}
              store={this.props.store}
              user={this.props.user}
              setTheState={this.props.setItemState}
              archivedItem={this.props.archivedItem}
              item={this.props.item}
              changeStores={this.props.changeStores}
            />
            <h1>isles</h1>
          </header>
          <Nav />
        </div>
        {/* <SwipeViews /> */}
      </React.Fragment>
    );
  }
}
