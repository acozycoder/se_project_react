const BASE_URL = "http://localhost:3001";
const token = localStorage.getItem("jwt");

const getHeaders = (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: getHeaders(token),
  }).then(checkResponse);
};

const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
};

const deleteItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(checkResponse);
};

const updateProfile = ({ name, avatar }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: getHeaders(token),
  }).then(checkResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(checkResponse);
};

export {
  checkResponse,
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
};
