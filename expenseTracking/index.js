const { GraphQLServer } = require("graphql-yoga");

const { dbFetch } = require("./dbFetch");
const { schema } = require("./schema.graphql");

const resolvers = {
  user: {
    expenses: (_, { initialDate, endDate, userId }) => {
      return dbFetch(`expenses/_find`, {
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
      return dbFetch(`users/${id}`).then(r => {
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
