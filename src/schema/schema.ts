import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as userResolvers, typeDefs as userTypeDefs } from '../entities/user/index.js';
import {
  resolvers as companyResolvers,
  typeDefs as companyTypeDefs,
} from '../entities/company/index.js';
import { resolvers as jobResolvers, typeDefs as jobTypeDefs } from '../entities/job/index.js';

const schema = makeExecutableSchema({
  resolvers: [userResolvers, companyResolvers, jobResolvers],
  typeDefs: [userTypeDefs, companyTypeDefs, jobTypeDefs],
});

export default schema;
