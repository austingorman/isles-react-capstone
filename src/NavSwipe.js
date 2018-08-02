import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";
// import Divider from "@material-ui/core/Divider";
import Sidebar from "./Sidebar";
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

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
    const { classes } = this.props;

    const sideList = (
      <div>
        <Sidebar
          setStoreState={this.props.setStoreState}
          toggleDrawer={this.toggleDrawer}
          store={this.props.store}
          user={this.props.user}
          setTheState={this.props.setItemState}
          archivedItem={this.props.archivedItem}
          item={this.props.item}
          changeStores={this.props.changeStores}
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
          <div
            id="drawer"
            tabIndex={0}
            // role="button"
            // onClick={this.toggleDrawer("left", false)}
            // onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}

// SwipeableTemporaryDrawer.propTypes = {
//   classes: PropTypes.object.isRequired
// };
