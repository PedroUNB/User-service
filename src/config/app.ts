/* eslint-disable no-console */
import morgan from 'morgan';
import express, { Application, Request, Response } from 'express';
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildSubgraphSchema } from '@apollo/federation';
import { typeDefs, resolvers } from '../app/graphql/mergeSchemas';
import { sequelize } from '@db/sequelize';
import { middlewares } from '@config/middlewares';

class App {
  express: Application;
  graphql: ApolloServer;

  constructor() {
    this.express = express();

    this.middlewares();
    this.apollo().then();
    this.db().then();
    this.routes();
  }

  async apollo(): Promise<void> {
    this.graphql = new ApolloServer({
      schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
      context: ({ req }) => ({
        req
      }),
      plugins: [
        ApolloServerPluginInlineTraceDisabled(),
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground()
      ]
    });

    await this.graphql.start();

    this.graphql.applyMiddleware({ app: this.express, path: '/graphql' });
  }

  middlewares(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(middlewares).forEach(([_, middleware]) => {
      this.express.use(middleware);
    });

    if (process.env.NODE_ENV === 'local' || process.env.MORGAN_LOG === 'true') {
      this.express.use(morgan('[:method] :remote-addr :status ":url" :response-time ms'));
    }
  }

  async db(): Promise<void> {
    sequelize
      .sync()
      .then(() => {
        if (process.env.NODE_ENV !== 'test') {
          console.log('\x1b[42m\x1b[30m[DATABASE]: Connected\x1b[0m');
        }
      })
      .catch((err: { message: string }) => {
        if (process.env.NODE_ENV !== 'test') {
          console.log(`\x1b[41m\x1b[37m[DATABASE]: ${err.message.toUpperCase()}\x1b[0m`);
        }
      });
  }

  routes(): void {
    this.express.get('/', (req: Request, res: Response) => {
      return res
        .status(200)
        .json({ message: `${process.env.SERVICE_NAME || 'Micro'} service its running` });
    });
  }
}

export default new App().express;
