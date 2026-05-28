import type { Resolvers } from '../../../types/resolvers-types.js';

const resolvers: Resolvers = {
  Job: {
    company: async (job, args, context) => {
      const company = await context.prisma.company.findUnique({
        where: {
          id: job.companyId,
        },
      });
      if (!company) throw new Error('Company not found');
      return company;
    },
    isApplied: async (job, args, context) => {
      if (!context.auth.user) throw new Error('Unauthorized');
      const isApplied = await context.prisma.job.count({
        where: { id: job.id, applicants: { some: { id: context.auth.user.id } } },
      });
      return isApplied > 0;
    },
  },
  Query: {
    searchJobs: async (root, args, context) => {
      const query = args.input.query;
      const jobs = await context.prisma.job.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { location: { contains: query } },
          ],
        },
      });
      return jobs;
    },
  },
  Mutation: {
    createJob: async (root, args, context) => {
      if (!context.auth.user?.isAdmin) {
        throw new Error('Unauthorized');
      }

      const { title, description, companyName, salary, type, location, remote } = args.input;

      const job = await context.prisma.job.create({
        data: {
          title,
          description,
          salary,
          type,
          location,
          remote,
          company: {
            create: {
              name: companyName,
            },
          },
          owner: {
            connect: {
              id: context.auth.user.id,
            },
          },
        },
      });

      return job;
    },
    deleteJob: async (root, args, context) => {
      if (!context.auth.user?.isAdmin) throw new Error('Unauthorized');

      await context.prisma.job.delete({
        where: { id: args.input.id, ownerId: context.auth.user.id },
      });

      return true;
    },
    applyForJob: async (root, args, context) => {
      if (!context.auth.user) throw new Error('Unauthorized');

      await context.prisma.job.update({
        where: { id: args.input.id },
        data: {
          applicants: {
            connect: { id: context.auth.user.id },
          },
        },
      });

      return true;
    },
    cancelJobApplication: async (root, args, context) => {
      if (!context.auth.user) throw new Error('Unauthorized');
      await context.prisma.job.update({
        where: { id: args.input.id },
        data: {
          applicants: {
            disconnect: { id: context.auth.user.id },
          },
        },
      });

      return true;
    },
  },
};
export default resolvers;
