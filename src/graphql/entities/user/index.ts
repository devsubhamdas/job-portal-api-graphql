import { loadGraphQL } from '../../../utils/graphql.utils.js';
import resolvers from './resolvers.js';

const typeDefs = loadGraphQL(import.meta.url, 'type-defs.graphql');

export { resolvers, typeDefs };
