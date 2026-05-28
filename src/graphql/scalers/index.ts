import { loadGraphQL } from '../../utils/graphql.utils.js';
import { DateTime } from './DateTime.js';

const typeDefs = loadGraphQL(import.meta.url, 'type-defs.graphql');

const resolvers = {
  DateTime,
};

export { typeDefs, resolvers };
