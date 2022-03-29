/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`🔥 Server started at https://localhost:${port}`);
});
