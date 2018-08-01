import React, { Component } from "react";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

export default class StoreList extends Component {
  state = {
    toggleStores: ""
  };

  componentDidMount() {
    this.props.setStoreState();
  }

  formLauncher = () => {
    if (this.state.toggleStores === "") {
      this.setState({
        toggleStores: <h1> Hi </h1>
      });
    } else {
      this.setState({
        toggleStores: ""
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          id="addStoreButton"
          onClick={this.formLauncher}
        >
          <Icon id="plus"> add </Icon>
        </Button>
        {this.state.toggleStores}
      </React.Fragment>
    );
  }
}
