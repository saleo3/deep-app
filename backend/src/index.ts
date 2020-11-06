import 'reflect-metadata';

import express from 'express';
import { getApolloserver } from './application/app';
import { createSchema } from './application/schema/';

import { connectDatabase } from './database';
import { runSeed } from './database/seeder';
import configs from './config';

import Container from 'typedi';
let loggerInstace: any;

async function bootstrap() {
  try {
    const app = express();

    const con = await connectDatabase(loggerInstace, configs);
    // await con.runMigrations();
    await runSeed();

    let schema = await createSchema();
    const server = await getApolloserver(
      'configs.authenticationSecret',
      schema
    );
    server.applyMiddleware({ app, path: configs.graphql.prefix });
    app.listen(configs.port);
    console.log('Running on port: ' + configs.port + '');
  } catch (err) {
    console.log(err);
    // loggerInstace.log("error", err);
  }
}

bootstrap();
