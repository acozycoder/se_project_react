const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    })
  }).then(checkResponse);
};

const deleteItem = (id) => {
    return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
  }).then(checkResponse);
};

export { getItems, addItem, deleteItem };
