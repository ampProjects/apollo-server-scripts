import { ApolloServer, gql } from 'apollo-server-lambda';
import apolloServerConfig from './apolloserver.config';

const server = new ApolloServer(apolloServerConfig);
 
export default server.createHandler();