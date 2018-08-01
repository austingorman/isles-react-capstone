import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
import SwipeViews from "./SwipeViews";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default class Nav extends Component {
  state = { value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    return (
      <Tabs>
        <Tab
          className="tab"
          label="Shopping List"
          to="/shoppinglist"
          component={Link}
        >
          {/* <NavLink to="/shoppinglist" /> */}
        </Tab>
        <Tab className="tab" label="Archive" to="/archive" component={Link}>
          {/* <NavLink to="/archive">Archive</NavLink> */}
        </Tab>
      </Tabs>
    );
  }
}
