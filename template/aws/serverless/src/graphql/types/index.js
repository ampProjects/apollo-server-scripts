import { mergeTypes } from 'merge-graphql-schemas';
import { gql } from 'apollo-server-lambda';

import defaultSchema from './default.types';

const schemas = [
  defaultSchema,
];

export default schemas;
