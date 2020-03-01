import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import fs from 'fs';

import apiRouter from './routes/index';
import userRouter from './routes/user.routes';
import adminRouter from './routes/admin.routes';
import productRouter from './routes/product.routes';
import categoryRouter from './routes/category.routes';
import addressRouter from './routes/address.routes';
import tagRouter from './routes/tag.routes';
import discountRouter from './routes/discount.routes';
import cartRouter from './routes/cartItem.routes';
import orderRouter from './routes/order.routes';
import authRouter from './routes/auth.routes';
import transactionRouter from './routes/transaction.routes';

import schema from './schema';
import mongoose from 'mongoose';
// COMMENTED CODE: DELETE SEED IN PRODUCTION
//
// import seed from './db/seed';

const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.error('MongoDB database connection established successfully!');
  // seed();
});
connection.once('open', () => {});
connection.once('error', err => {
  console.log('error from Mongoose', err);
});

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/address', addressRouter);
app.use('/api/v1/tag', tagRouter);
app.use('/api/v1/discount', discountRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transaction', transactionRouter);

app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true,
  }),
);

const clientPath = path.join(__dirname, '../', 'client/build');

if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
