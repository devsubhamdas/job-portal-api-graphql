import { UserRole, type Resolvers } from '../../../types/resolvers-types.js';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  User: {
    appliedJobs: async (user, args, context) => {
      return context.prisma.job.findMany({
        where: { applicants: { some: { id: user.id } } },
      });
    },
    ownedJobs: async (user, args, context) => {
      if (!context.auth.user?.isAdmin) return [];
      return context.prisma.job.findMany({ where: { ownerId: user.id } });
    },
  },
  Query: {
    me: async (_, args, context) => {
      if (!context.auth.user) return null;
      const user = await context.prisma.user.findUnique({ where: { id: context.auth.user.id } });
      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
      };
    },
    ownedJobs: async (_, args, context) => {
      if (!context.auth.user) return [];
      return (
        (
          await context.prisma.user.findUnique({
            where: { id: context.auth.user.id },
            select: { ownedJobs: { orderBy: { createdAt: 'desc' } } },
          })
        )?.ownedJobs ?? []
      );
    },
    appliedJobs: async (_, args, context) => {
      if (!context.auth.user) return [];
      return (
        (
          await context.prisma.user.findUnique({
            where: { id: context.auth.user.id },
            select: { appliedJobs: { orderBy: { createdAt: 'desc' } } },
          })
        )?.appliedJobs ?? []
      );
    },
  },
  Mutation: {
    signup: async (root, args, context) => {
      const { name, email, role, password } = args.input;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await context.prisma.user.create({
        data: {
          name,
          email,
          role,
          password: hashPassword,
        },
      });

      context.auth.login({ id: user.id, isAdmin: user.role === UserRole.Admin });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
      };
    },
    login: async (root, args, context) => {
      const { email, password } = args.input;
      const user = await context.prisma.user.findUnique({
        where: { email },
      });
      if (!user) throw new Error('invalid email: user not found');

      const isPwdCorrect = await bcrypt.compare(password, user.password);
      if (!isPwdCorrect) throw new Error('invalid password');

      context.auth.login({ id: user.id, isAdmin: user.role === UserRole.Admin });

      return { id: user.id, name: user.name, email: user.email, role: user.role as UserRole };
    },
    logout: (root, args, context) => {
      context.auth.logout();
      return true;
    },
  },
};
export default resolvers;
