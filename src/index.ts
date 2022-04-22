import express from 'express';
import 'dotenv/config';
import { createServer } from 'http';
import socket from './websocket';
import routes from './routes';

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(routes);

const httpServer = createServer(app);
socket(httpServer);

httpServer.listen(port, () => {
  console.log(`🔥 Server started at https://localhost:${port}`);
});

export default app;
