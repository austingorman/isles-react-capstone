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
          `http://localhost:5002/items?storeId=${storeId}&_sort=aisle&_order=desc`
        );
      }
    },
    deleter: {
      value: (deleter, itemId) => {
        return fetch(`http://localhost:5002/${deleter}/${itemId}`, {
          method: "DELETE"
        });
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
        });
      }
    },
    postItem: {
      value: (quantity, itemName, aisle, archived, storeId, userId) => {
        return fetch(
          `http://localhost:5002/items?storeId=${storeId}&_sort=aisle&_order=desc`,
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
        );
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
        });
      }
    },
    updateItem: {
      value: (itemId, quantity, itemName, aisle) => {
        return fetch(`http://localhost:5002/items/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity,
            name: itemName,
            aisle: aisle,
            archived: false
          })
        });
      }
    }
  }
);

export default APIManager;
