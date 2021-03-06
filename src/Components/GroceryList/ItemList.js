import React, { Component } from "react";
import Item from "./Item";
import APIManager from "../../APIManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

export default class ItemList extends Component {
  state = { toggleForms: "", itemsDisplay: [] };

  getAllStoreItems = () => {
    let store = this.props.selectedStore;
    APIManager.getStore(store).then(response => {
      this.setState({ itemsDisplay: response });
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

  formLauncher = () => {
    if (this.state.toggleForms === "") {
      this.setState({
        toggleForms: (
          <form onSubmit={this.addNewItem}>
            <div id="inputForms">
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Quantity"
                  // className={classes.textField}
                  // helperText="Quantity"
                  // margin="normal"
                  className="quantityForm"
                  name="quantity"
                  type="number"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Item Name"
                  // defaultValue="Default Value"
                  className="itemForm"
                  name="item"
                  type="text"
                />
              </div>
              <div className="inputForm">
                <TextField
                  id="helperText"
                  label="Aisle"
                  defaultValue="Default Value"
                  className="aisleForm"
                  name="aisle"
                  type="number"
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              id="submitItemButton"
              type="submit"
            >
              Submit
            </Button>
          </form>
        )
      });
    } else {
      this.setState({ toggleForms: "" });
    }
  };

  addNewItem = event => {
    event.preventDefault();
    const Quantity = event.target.quantity.value;
    const ItemName = event.target.item.value;
    const Aisle = parseInt(event.target.aisle.value, 10);
    const StoreId = this.props.selectedStore;
    // const StoreUserId = this.props.item.userId;
    APIManager.postItem(Quantity, ItemName, Aisle, false, String(StoreId))
      .then(() => {
        this.getAllStoreItems();
      })
      .then(this.setState({ toggleForms: "" }));
  };

  archiver = itemId => {
    // event.preventDefault();
    APIManager.patchItem(itemId, true).then(() => {
      // this.props.setTheState();
      this.getAllStoreItems();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="overflowList">
          <ul className="groceryItems">
            {this.state.itemsDisplay.map(item => (
              <Item
                key={item.id}
                item={item}
                itemsDisplay={this.itemsDisplay}
                archiver={this.archiver}
                storeId={this.props.storeId}
                setTheState={this.props.setTheState}
                getAllStoreItems={this.getAllStoreItems}
              />
            ))}
          </ul>
          <Card id="addItemButtonForm">
            <div>
              {this.state.toggleForms}
              <Button
                variant="contained"
                id="addItemButton"
                onClick={this.formLauncher}
              >
                <Icon id="plus">add</Icon>
                {/* <h4>Add New Item</h4> */}
              </Button>
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

// addNewItem = event => {
//   event.preventDefault();
//   const Quantity = event.target.quantity.value;
//   const ItemName = event.target.item.value;
//   const Aisle = parseInt(event.target.aisle.value, 10);
//   const StoreId = this.props.store.storeid;
//   const StoreUserId = this.props.store.userID;

//   APIManager.postItem(Quantity, ItemName, Aisle, false, StoreId, StoreUserId)
//     .then(() => {
//       return fetch(`http://localhost:5002/items/`);
//     })
//     .then(a => a.json())
//     .then(() => {
//       APIManager.getAll(
//         `items?_sort=aisle&_order=ascitems_storeId=${StoreId}"`.then(items =>
//           this.props.setTheState({
//             item: items,
//             archivedItem: items
//           })
//         )
//       );
//     })
//     .then(this.setState({ toggleForms: "" }));
// };
