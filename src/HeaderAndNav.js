import React, { Component } from "react";
import Nav from "./Nav";
import NavSwipe from "./NavSwipe";

// import SwipeViews from "./SwipeViews";

export default class HeaderAndNav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <NavSwipe />
          <h1>isles</h1>
        </header>
        <Nav />
        {/* <SwipeViews /> */}
      </React.Fragment>
    );
  }
}
