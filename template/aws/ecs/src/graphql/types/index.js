import { mergeTypes } from 'merge-graphql-schemas';
import { gql } from 'apollo-server-express';

import defaultSchema from './default.schema';

const schemas = [
  defaultSchema,
];

export default gql(mergeTypes(schemas));
