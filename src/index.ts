import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { expressMiddleware } from '@as-integrations/express5';
import schema from './graphql/schema/schema.js';
import createContext from './graphql/context/context.js';
import { prisma } from './lib/prisma.js';

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const app = express();

const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// apollo config
const server = new ApolloServer({
  schema,
});

useServer(
  {
    schema,
    context: async (ctx) => createContext(), // { req, res } is not available
  },
  wsServer
);

async function startServer() {
  await server.start();

  const allowedOrigins = String(process.env.ALLOWED_ORIGINS).split(',');

  if (allowedOrigins.length === 0) {
    console.warn('Warning: No ALLOWED_ORIGINS set — all browser origins will be blocked');
  }

  app.use(
    '/graphql',
    cors({
      origin: (origin, callback) => {
        // for no-origins like postman, curl
        if (!origin) {
          return callback(null, true);
        }

        if (!allowedOrigins.includes(origin)) {
          return callback(new Error('Not-allowed-by-CORS'));
        }

        return callback(null, true);
      },
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => createContext({ req, res }),
    })
  );

  // Server health
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
    });
  });

  // Database readiness
  app.get('/ready', async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;

      res.status(200).json({
        status: 'ok',
        message: 'database available',
      });
    } catch (error) {
      res.status(503).json({
        status: 'database unavailable',
      });
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`http server is running at :${PORT}/graphql`);
    console.log(`websocket server is running at :${PORT}/graphql`);
  });
}

startServer();
