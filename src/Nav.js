import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
import Button from "@material-ui/core/Button";

export default class Nav extends Component {
  render() {
    return (
      <React.Fragment>
        {isLoggedIn() ? <Link to="/">Main</Link> : ""}

        {isLoggedIn() ? (
          <Button
            id="logout"
            className="btn btn-danger log"
            onClick={() => logout()}
          >
            Log out
          </Button>
        ) : (
          <Button
            variant="outlined"
            id="login"
            className="btn btn-info log"
            onClick={() => login()}
          >
            Log In
          </Button>
        )}
      </React.Fragment>
    );
  }
}
