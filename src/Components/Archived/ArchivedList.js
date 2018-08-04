import React, { Component } from "react";
import ArchivedItem from "../Archived/ArchivedItem";
import APIManager from "../../APIManager";

export default class ArchivedList extends Component {
  state = { archivedDisplay: [] };

  getAllStoreItems = () => {
    let store = this.props.selectedStore;
    APIManager.getStore(store).then(response => {
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
    APIManager.patchItem(itemId, false).then(() => {
      // this.props.setTheState();
      this.getAllStoreItems();
    });
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
              getAllStoreItems={this.getAllStoreItems}
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
