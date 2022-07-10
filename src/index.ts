const { ApolloServer, gql } = require('apollo-server');
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import db from '../models';
import { getUsers } from './utils';

getUsers();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

db.sequelize.sync().then(() => {
  server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
