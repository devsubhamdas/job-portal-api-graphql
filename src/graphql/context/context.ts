import { PrismaClient, type Job } from '../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import createDataloaders from '../../dataloaders/index.js';
import { PubSub } from 'graphql-subscriptions';

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string; isAdmin: boolean } | null;
    login: (args: { id: string; isAdmin: boolean }) => void;
    logout: () => void;
  };
  dataloaders: ReturnType<typeof createDataloaders>;
  pubsub: typeof pubsub;
}

const pubsub = new PubSub<{
  JOB_CREATED: {
    jobCreated: Job;
  };
}>();

const parseToken = (token: string) => {
  const parsedToken = token ? jwt.verify(token, process.env.JWT_SECRET) : null;
  if (!parsedToken) return null;

  const payload = z
    .object({
      id: z.string(),
      isAdmin: z.boolean(),
    })
    .safeParse(parsedToken);

  return payload.success ? payload.data : null;
};

const createContext = async (ctx?: { req: Request; res: Response }): Promise<Context> => {
  const token = ctx?.req.cookies?.token;
  const user = parseToken(token);

  const isProd = process.env.ENV === 'production';
  const cookieOptions = {
    domain: !isProd ? 'localhost' : undefined,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // expires: 7d
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    path: '/',
  };

  return {
    prisma,
    auth: {
      user,
      login: (args) => {
        const token = jwt.sign(args, process.env.JWT_SECRET, { expiresIn: '7d' });
        ctx?.res.cookie('token', token, cookieOptions);
      },
      logout: () => {
        ctx?.res.clearCookie('token', cookieOptions);
      },
    },
    dataloaders: createDataloaders({ prisma, userId: user?.id }),
    pubsub,
  };
};

export default createContext;
