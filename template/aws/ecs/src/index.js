import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/types';


const app = express();

const apolloServerConfig = {
  typeDefs,
  resolvers,
  formatError,
  introspection: true,
  playground: true,
  cors: {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    preflightContinue: true,
    optionsSuccessStatus: 200,
  },
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return {
      token,
    };
  },
};
const server = new ApolloServer(apolloServerConfig);

server.applyMiddleware({ app });

app.listen({
  server: app,
  port: process.env.PORT || 3000,
}, () => {
  // eslint-disable-next-line
  console.log(`Server ready at: http://localhost:${process.env.PORT}`);
});
