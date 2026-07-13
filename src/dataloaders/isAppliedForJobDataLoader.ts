import DataLoader from 'dataloader';
import type { IDataLoaderArgs } from './index.js';

const createIsAppliedForDataLoader = ({ prisma, userId }: IDataLoaderArgs) => {
  return new DataLoader(async (keys: readonly string[]) => {
    if (!userId) return keys.map(() => false);
    const jobs = await prisma.job.findMany({
      where: { id: { in: [...keys] }, applicants: { some: { id: userId } } },
      select: { id: true },
    });
    const applied = new Set(jobs.map((job) => job.id));
    return keys.map((key) => applied.has(key));
  });
};

export default createIsAppliedForDataLoader;
