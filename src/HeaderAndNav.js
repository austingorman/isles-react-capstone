import React from "react";
import Nav from "./Nav";
import NavSwipe from "./NavSwipe";
// import SwipeViews from "./SwipeViews";

export default class HeaderAndNav extends React.Component {
  state = { storeName: "" };

  storeNamer = name => {
    this.setState({
      storeName: name
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="tabs">
          <header>
            <NavSwipe
              setStoreState={this.props.setStoreState}
              store={this.props.store}
              user={this.props.user}
              storeNamer={this.storeNamer}
              setTheState={this.props.setItemState}
              changeStores={this.props.changeStores}
            />
            <h1>isles</h1>
            <h2 className="storeName">{this.state.storeName}</h2>
          </header>
          <Nav />
        </div>
        {/* <SwipeViews /> */}
      </React.Fragment>
    );
  }
}
