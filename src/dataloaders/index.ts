import type { PrismaClient } from '../generated/prisma/client.js';
import createIsAppliedForDataLoader from './isAppliedForJobDataLoader.js';

export interface IDataLoaderArgs {
  prisma: PrismaClient;
  userId?: string | undefined;
}

const createDataloaders = (args: IDataLoaderArgs) => {
  return {
    isAppliedForJob: createIsAppliedForDataLoader(args),
  };
};

export default createDataloaders;
