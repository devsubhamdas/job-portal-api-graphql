import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { expressMiddleware } from '@as-integrations/express5';
import schema from './graphql/schema/schema.js';
import createContext from './graphql/context/context.js';

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

// apollo config
const server = new ApolloServer({
  schema: schema,
});

async function startServer() {
  await server.start();

  const allowedOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2, 'http://localhost:8081'];
  if (allowedOrigins.length === 0) {
    console.warn('Warning: No ORIGIN_1/ORIGIN_2 set — all browser origins will be blocked');
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

  app.listen(PORT, () => {
    console.log(`server running at http://${HOSTNAME}:${PORT}/graphql`);
  });
}

startServer();
