import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

function startServer() {
  app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
}

startServer();
