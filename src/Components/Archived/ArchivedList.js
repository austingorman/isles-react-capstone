import React, { Component } from "react";
import ArchivedItem from "../Archived/ArchivedItem";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import HeaderAndNav from "../../HeaderAndNav";

export default class ArchivedList extends Component {
  state = { archivedDisplay: [] };

  getAllStoreItems = () => {
    let store = this.props.selectedStore;
    APIManager.getStore(store).then(response => {
      console.log(response);
      this.setState({
        archivedDisplay: response
      });
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectedStore !== prevProps.selectedStore) {
      this.getAllStoreItems();
    }
  }

  componentDidMount() {
    this.getAllStoreItems();
  }

  unarchiver = itemId => {
    // event.preventDefault();
    APIManager.patchItem(itemId, false)
      .then(() => {
        return fetch("http://localhost:5002/items");
      })
      .then(a => a.json());
    // .then(() => {
    //   APIManager.getAll("items").then(items =>
    //     this.props.setTheState({
    //       items: items,
    //       archivedItem: items
    //     })
    //   );
    // });
  };

  render() {
    return (
      <React.Fragment>
        {/* <HeaderAndNav /> */}
        <ul className="archivedItems">
          {this.state.archivedDisplay.map(archivedItem => (
            <ArchivedItem
              key={archivedItem.id}
              archivedItem={archivedItem}
              unarchiver={this.unarchiver}
              setTheState={this.props.setTheState}
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
