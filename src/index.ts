import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import userRoutes from './routes/user.routes';

createConnection()
  .then((connection) => {
    console.log('> mongodb connected.');
    const app = express();
    // middlewares
    app.use(express.json());
    // routes
    app.use(userRoutes);

    app.listen(5000, () => console.log('> server running.'));
  })
  .catch((err) => {
    if (err) console.log(err);
  });
