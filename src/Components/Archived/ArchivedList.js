import React, { Component } from "react";
import ArchivedItem from "./ArchivedItem";
import APIManager from "../../APIManager";

export default class ArchivedList extends Component {
  state = { archiveditem: [] };

  setArchivedState = () => {
    APIManager.getAll("items").then(archived =>
      this.setState({
        archiveditem: archived
      })
    );
  };
  render() {
    return <h1>ArchivedItem</h1>;
  }
}
