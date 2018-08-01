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
            <NavSwipe />
            <h1>Isles</h1>
          </header>
          <Nav />
        </div>
        {/* <SwipeViews /> */}
      </React.Fragment>
    );
  }
}
