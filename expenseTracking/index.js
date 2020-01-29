const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const { schema } = require("./schema.graphql");
const API_URL = "http://13.85.67.250:5984/";
const base64 = require("base-64");

function apiFetch(path, options) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Basic ${base64.encode(`admin:admin`)}`,
      "content-type": "application/json"
    },
    ...options
  }).then(r => r.json());
}

const resolvers = {
  user: {
    expenses: (_, { initialDate, endDate, userId }) => {
      return apiFetch(`expenses/_find`, {
        method: "POST",
        body: JSON.stringify({
          selector: {
            userId
          }
        })
      }).then(r => {
        return r.docs;
      });
    }
  },
  Query: {
    user: (_, { id }) => {
      return apiFetch(`users/${id}`).then(r => {
        return r;
      });
    }
  },
  Mutation: {
    setExpense: (_, { userId }) => "hello world"
  }
};

const server = new GraphQLServer({ typeDefs: schema, resolvers });
server.start(() => console.log("started"));
