import React, { Component } from "react";
import ItemList from "./Components/GroceryList/ItemList";
import ArchivedList from "./Components/Archived/ArchivedList";

export default class Isles extends Component {
  // // items?_sort=id&order=desc

  render(state) {
    return (
      <React.Fragment>
        <ItemList />
        <ArchivedList />
      </React.Fragment>
    );
  }
}

// class Isles extends Component {
//   state = { items: [], archived: [] };

//   setItemState = () => {
//     APIManager.getAll("items").then(items =>
//       this.setState({
//         items: items
//       })
//     );
//   };
//   setArchivedState = () => {
//     APIManager.getAll("items").then(archived =>
//       this.setState({
//         archived: archived
//       })
//     );
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <ItemList items={this.state.items} setItemState={this.setItemState} />
//         <ArchivedList
//           archive={this.state.archived}
//           setArchivedState={this.setArchiveState}
//         />
//       </React.Fragment>
//     );
//   }
// }

// export default Isles;
