import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as scalerResolvers, typeDefs as scalerTypeDefs } from '../scalers/index.js';
import { resolvers as userResolvers, typeDefs as userTypeDefs } from '../entities/user/index.js';
import {
  resolvers as companyResolvers,
  typeDefs as companyTypeDefs,
} from '../entities/company/index.js';
import { resolvers as jobResolvers, typeDefs as jobTypeDefs } from '../entities/job/index.js';

const schema = makeExecutableSchema({
  typeDefs: [scalerTypeDefs, userTypeDefs, companyTypeDefs, jobTypeDefs],
  resolvers: [scalerResolvers, userResolvers, companyResolvers, jobResolvers],
});

export default schema;
