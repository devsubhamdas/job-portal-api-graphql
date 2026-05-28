import type { Resolvers } from '../../../types/resolvers-types.js';

const resolvers: Resolvers = {
  Query: {
    me: (root, args, context) => {
      return { id: '1', name: 'user' };
    },
  },
};
export default resolvers;
