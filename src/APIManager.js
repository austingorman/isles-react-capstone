const APIManager = Object.create(
  {},
  {
    getAll: {
      value: collectionName => {
        return fetch(`http://localhost:5002/${collectionName}`).then(e =>
          e.json()
        );
      }
    },
    getStore: {
      value: storeId => {
        return fetch(
          `http://localhost:5002/items?storeId=${storeId}&_sort=aisle&_order=asc`
        ).then(e => e.json());
      }
    },
    deleter: {
      value: (deleter, itemId) => {
        return fetch(`http://localhost:5002/${deleter}/${itemId}`, {
          method: "DELETE"
        }).then(a => a.json());
      }
    },
    postStore: {
      value: storeName => {
        return fetch(`http://localhost:5002/stores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: storeName
          })
        }).then(a => a.json());
      }
    },
    postItem: {
      value: (quantity, itemName, aisle, archived, storeId, userId) => {
        return fetch(
          `http://localhost:5002/items?storeId=${storeId}&_sort=aisle&_order=asc`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              quantity: quantity,
              name: itemName,
              aisle: aisle,
              archived: archived,
              storeId: storeId,
              userId: userId
            })
          }
        ).then(a => a.json());
      }
    },
    patchItem: {
      value: (itemId, archived) => {
        return fetch(`http://localhost:5002/items/${itemId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            archived: archived
          })
        }).then(a => a.json());
      }
    },
    // updateItem: {
    //   value: (itemId, quantity, itemName, aisle) => {
    //     return fetch(`http://localhost:5002/items/${itemId}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         quantity: quantity,
    //         name: itemName,
    //         aisle: aisle,
    //         archived: false
    //       })
    //     });
    //   }
    // },
    editItems: {
      value: (itemId, dataObject) => {
        return fetch(`http://localhost:5002/items/${itemId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataObject)
        });
      }
    }
  }
);

export default APIManager;
