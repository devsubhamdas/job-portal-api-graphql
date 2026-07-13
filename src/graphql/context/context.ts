import { PrismaClient } from '../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import createDataloaders from '../../dataloaders/index.js';

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string; isAdmin: boolean } | null;
    login: (args: { id: string; isAdmin: boolean }) => void;
    logout: () => void;
  };
  dataloaders: ReturnType<typeof createDataloaders>;
}

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

const createContext = async ({ req, res }: { req: Request; res: Response }): Promise<Context> => {
  const token = req.cookies?.token;
  const user = parseToken(token);

  return {
    prisma,
    auth: {
      user,
      login: (args) => {
        const token = jwt.sign(args, process.env.JWT_SECRET);
        res.cookie('token', token, {
          domain: 'localhost',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
        });
      },
      logout: () => {
        res.clearCookie('token');
      },
    },
    dataloaders: createDataloaders({ prisma, userId: user?.id }),
  };
};

export default createContext;
