import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";

import Divider from "@material-ui/core/Divider";
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
    top: false,
    left: false,
    bottom: false,
    right: false
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
        <Sidebar />
      </div>
    );

    // const fullList = (
    //   <div className={classes.fullList}>
    //     <List>{mailFolderListItems}</List>
    //     <Divider />
    //     <List>{otherMailFolderListItems}</List>
    //   </div>
    // );

    return (
      <div>
        <Button className="navSwipe" onClick={this.toggleDrawer("left", true)}>
          <Icon>menu</Icon>
        </Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};
