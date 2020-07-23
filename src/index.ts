import 'module-alias/register';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Resolvers } from '@resolver/index';
import { customAuthChecker } from '@middleware/AuthMiddleware';

const startServer = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: Resolvers,
    authChecker: customAuthChecker
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    }
  });
  const path = process.env.ROOT_PATH;
  const app = express();
  apolloServer.applyMiddleware({ app, path });
  app.listen(process.env.PORT, () => console.log(`Server started on http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`));
};

startServer();
