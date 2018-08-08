import React from "react";
import Nav from "./Nav";
import NavSwipe from "./NavSwipe";

export default class HeaderAndNav extends React.Component {
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
              handleFieldChange={this.props.handleFieldChange}
              editStoreName={this.props.editStoreName}
              setNewStoreName={this.props.setNewStoreName}
              isAuthenticated={this.props.isAuthenticated}
              auth={this.props.auth}
            />
            <h1>isles</h1>
            <h2 className="storeName">{this.props.selectedStoreName}</h2>
          </header>
          <Nav />
        </div>
      </React.Fragment>
    );
  }
}
