import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default class Nav extends Component {
  state = {
    ShoppingListIsSelected: "selected",
    ArchivedListIsSelected: "notSelected"
  };

  selectShoppingList = e => {
    this.setState({
      ShoppingListIsSelected: "selected",
      ArchivedListIsSelected: "notSelected"
    });
  };

  selectArchive = e => {
    this.setState({
      ShoppingListIsSelected: "notSelected",
      ArchivedListIsSelected: "selected"
    });
  };

  render() {
    return (
      <Tabs>
        <Tab
          className={this.state.ShoppingListIsSelected}
          label="Shopping List"
          to="/shoppinglist"
          component={Link}
          onClick={this.selectShoppingList}
        />
        <Tab
          className={this.state.ArchivedListIsSelected}
          label="Archive"
          to="/archive"
          component={Link}
          onClick={this.selectArchive}
        />
      </Tabs>
    );
  }
}
