import cors from 'cors';
import helmet from 'helmet';
import glue from 'schemaglue';
import express from 'express';
import bodyParser from 'body-parser';
import expressGraphql from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';


import Config from './config/config';
import Boostrap from './bootstrap/Bootstrap';
import Logger from './app/Helpers/Logger';
import isAuth from './app/Middlewares/isAuth';
import ExceptionHandler from './app/Exceptions/ExceptionHandler';

// loads config and env variables in process
Config();

const app = express();
const { schema, resolver } = glue('app/Graphql');
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers: resolver });
// security middleware
app.use(helmet());


// maximum request size limit middleware
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use('/docs', express.static(`${__dirname}/docs`));
app.use('/dist/', express.static(`${__dirname}/public/dist`));
app.use('/views/', express.static(`${__dirname}/public/views`));

app.use('/api', [cors(), isAuth]);

app.use('/api', expressGraphql(request => ({
  schema: executableSchema,
  context: request.context,
  formatError: error => ExceptionHandler(error),
})));

// initalizing global required services and creating server
Promise.all(Boostrap.intializeServices()).then(() => {
  app.listen(process.hope.app.port, () => {
    Logger.info('Server Started Successfully');
  });
}).catch((error) => {
  Logger.error(error);
});
