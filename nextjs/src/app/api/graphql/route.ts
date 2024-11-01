import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { typeDefs } from '../../../graphql/schema'
import { resolvers } from '../../../graphql/resolver'


const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };