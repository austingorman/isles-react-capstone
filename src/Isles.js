import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";
import APIManager from "./APIManager";
import Auth from "./Components/Auth/Auth";
import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
import { Link } from "react-router-dom";

export default class Isles extends Component {
  state = { item: [], archivedItem: [] };

  setItemState = () => {
    APIManager.getAll("items?_sort=aisle").then(items => {
      this.setState({ item: items, archivedItem: items });
    });
  };
  render() {
    // const auth = new Auth();
    // auth.login();
    return (
      <React.Fragment>
        {/* {isLoggedIn() ? <Link to="/">Main</Link> : ""} */}
        <ItemList setTheState={this.setItemState} item={this.state.item} />
        <ArchivedList
          setTheState={this.setItemState}
          archivedItem={this.state.archivedItem}
        />
      </React.Fragment>
    );
  }
}

// import React, { Component } from "react";
// import ItemList from "./Components/GroceryList/ItemList";
// import ArchivedList from "./Components/Archived/ArchivedList";
// import APIManager from "./APIManager";
// import Auth from "./Components/Auth/Auth";
// import { login, logout, isLoggedIn } from "./Components/Auth/AuthService";
// import { Route } from "react-router-dom";

// export default class Isles extends Component {
//   state = { item: [], archivedItem: [] };

//   setItemState = () => {
//     APIManager.getAll("items?_sort=aisle").then(items => {
//       this.setState({ item: items, archivedItem: items });
//     });
//   };
//   render() {
//     // const auth = new Auth();
//     // auth.login();
//     return (
//       <React.Fragment>
//         <Route
//           exact
//           path="/"
//           render={props => {
//             return <ItemList />;
//           }}
//         />
//         <Route
//           path="/mainlist"
//           render={state => {
//             return (
//               <ItemList
//                 setTheState={this.setItemState}
//                 item={this.state.item}
//               />
//             );
//           }}
//         />
//         <Route
//           path="/archive"
//           render={state => {
//             return (
//               <ArchivedList
//                 setTheState={this.setItemState}
//                 archivedItem={this.state.archivedItem}
//               />
//             );
//           }}
//         />
//       </React.Fragment>
//     );
//   }
// }
