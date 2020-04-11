import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";
import { BookResolver } from "./resolvers/BookResolver";

(async () => {
  const app = express();

  //put middleware here

  // get options from ormconfig.js
  const dbOptions = await getConnectionOptions();
  await createConnection({ ...dbOptions });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, BookResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
