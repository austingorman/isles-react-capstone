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
    if (this.props.selectedStore !== prevProps.selectedStore) {
      this.getAllStoreItems();
    }
  }

  componentDidMount() {
    this.getAllStoreItems();
  }

  unarchiver = itemId => {
    APIManager.patchItem(itemId, false).then(() => {
      this.getAllStoreItems();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="overflowArchivedList">
          <ul className="groceryItems">
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
        </div>
      </React.Fragment>
    );
  }
}
