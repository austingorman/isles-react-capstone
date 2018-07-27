const ApiManager = Object.create(
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
      value: (collectionName, itemId) => {
        return fetch(`http://localhost:5002/${collectionName}/${itemId}`, {
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
    updateItem: {
      value: (collectionName, itemId, dataObject) => {
        return fetch(`http://localhost:5002/${collectionName}/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataObject)
        });
      }
    }
  }
);

export default ApiManager;
