import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Sidebar from "./Sidebar";

export default class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const sideList = (
      <div>
        <Sidebar
          setStoreState={this.props.setStoreState}
          toggleDrawer={this.toggleDrawer}
          store={this.props.store}
          user={this.props.user}
          storeNamer={this.props.storeNamer}
          setTheState={this.props.setItemState}
          changeStores={this.props.changeStores}
          handleFieldChange={this.props.handleFieldChange}
          editStoreName={this.props.editStoreName}
          setNewStoreName={this.props.setNewStoreName}
          isAuthenticated={this.props.isAuthenticated}
          auth={this.props.auth}
        />
      </div>
    );
    return (
      <React.Fragment>
        <Button id="navSwipeButton" onClick={this.toggleDrawer("left", true)}>
          <Icon>menu</Icon>
        </Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div id="drawer" tabIndex={0}>
            {sideList}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}
