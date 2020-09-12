import 'module-alias/register';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Resolvers } from '@resolver/index';
import { customAuthChecker } from '@middleware/AuthMiddleware';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe, getOperationAST } from 'graphql';
import { createServer } from 'http';
import { graphqlUploadExpress } from 'graphql-upload';

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
    },
    // logger: ,
    introspection: true,
    debug: true,
    uploads: false,
    subscriptions: {
      path: '/subscriptions',
      onConnect: (connectionParams, webSocket, context) => console.log('Connected to websocket'),
      onDisconnect: (webSocket, context) => console.log('Discnnected to websocket'),
      // keepAlive: 
    }
  });
  const path = process.env.ROOT_PATH;
  const app = express();
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  apolloServer.applyMiddleware({ app, path, cors: false });
  const server = createServer(app);
  server.listen(process.env.PORT, () => {
    new SubscriptionServer({ execute, subscribe, schema }, { server: server, path: '/subscriptions' });
    console.log(`Server started on http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`);
  });
};

startServer();
