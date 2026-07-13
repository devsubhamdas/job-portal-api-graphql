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
      if (!context.auth.user) return null;
      return await context.dataloaders.isAppliedForJob.load(job.id);
    },
  },
  Query: {
    searchJobs: async (root, args, context) => {
      const { query, cursor, limit } = args.input;
      const jobs = await context.prisma.job.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit ?? 10,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
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
            connectOrCreate: {
              where: { name: companyName },
              create: { name: companyName },
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
      // 1. Check job exists
      const job = await context.prisma.job.findUnique({
        where: { id: args.input.id },
      });

      if (!job) throw new Error('Job not found');

      // 2. Check if the user owns the job
      if (job.ownerId !== context.auth.user.id)
        throw new Error('Unauthorized: User does not own the job');

      // 3. Delete
      await context.prisma.job.delete({
        where: { id: args.input.id, ownerId: context.auth.user.id },
      });

      return true;
    },
    applyForJob: async (root, args, context) => {
      if (!context.auth.user) throw new Error('Unauthorized');

      // 1. Check job exists
      const job = await context.prisma.job.findUnique({
        where: { id: args.input.id },
      });

      if (!job) throw new Error('Job not found');

      // 2. Check user hasn't already applied
      const hasApplied = await context.prisma.job.findFirst({
        where: {
          id: args.input.id,
          applicants: { some: { id: context.auth.user.id } },
        },
      });

      if (hasApplied) throw new Error('Already applied');

      // 3. Connect
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

      // 1. Check job exists
      const job = await context.prisma.job.findUnique({
        where: { id: args.input.id },
      });

      if (!job) throw new Error('Job not found');

      // 2. Check user already applied
      const hasApplied = await context.prisma.job.findFirst({
        where: {
          id: args.input.id,
          applicants: { some: { id: context.auth.user.id } },
        },
      });

      if (!hasApplied) throw new Error('Not applied');

      // 3. Disconnect
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
