import formatError from 'apollo-errors';
import schema from './graphql';

export default {
  schema,
  formatError,
  introspection: true,
  playground: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
};
