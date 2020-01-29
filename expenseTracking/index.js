const { GraphQLServer } = require("graphql-yoga");

const { dbFetch } = require("./dbFetch");
const { schema } = require("./schema.graphql");

const resolvers = {
  user: {
    expenses: (_, { userId }) => {
      
    }
  },
  Query: {
    user: (_, { id }) => {
      
    }
  },
  Mutation: {
    setExpense: (_, { input }) =>
      
  }
};

const server = new GraphQLServer({ typeDefs: schema, resolvers });
server.start(() => console.log("started"));
