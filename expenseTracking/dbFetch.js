const fetch = require("node-fetch");
const base64 = require("base-64");

const API_URL = "http://13.85.67.250:5984/";

function dbFetch(path, options) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Basic ${base64.encode(`admin:admin`)}`,
      "content-type": "application/json"
    },
    ...options
  }).then(r => r.json());
}

module.exports = {
  dbFetch
};
