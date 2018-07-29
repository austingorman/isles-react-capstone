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
    deleteItem: {
      value: itemId => {
        return fetch(`http://localhost:5002/items/${itemId}`, {
          method: "DELETE"
        });
      }
    },
    postItem: {
      value: (quantity, itemName, aisle, archived) => {
        return fetch(`http://localhost:5002/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity,
            name: itemName,
            aisle: aisle,
            archived: archived
          })
        });
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
