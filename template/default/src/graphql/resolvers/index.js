import { mergeResolvers } from 'merge-graphql-schemas';
import defaultResolver from './default.resolver';

const resolvers = [
  defaultResolver,
];

export default mergeResolvers(resolvers);
