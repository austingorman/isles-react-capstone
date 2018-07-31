import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";

export default class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
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
        <button className="sidebar">Stores</button>
      </React.Fragment>
    );
  }
}
