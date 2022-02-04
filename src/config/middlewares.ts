import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import { rateLimit } from 'express-rate-limit';

export const middlewares = {
  'body-parser': express.json(),

  cors: cors({ origin: '*' }),

  urlencoded: express.urlencoded({ extended: true }),

  'urlencoded-params': urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 5000000
  }),

  helmet: helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    originAgentCluster: false
  })
  //
  // rateLimit: rateLimit({
  //   windowMs: 1000,
  //   max: 20,
  //   standardHeaders: true,
  //   legacyHeaders: false
  // })
};
