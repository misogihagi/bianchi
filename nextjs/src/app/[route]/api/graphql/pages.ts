import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { typeDefs } from '../../../graphql/schema'
import { resolvers } from '../../../graphql/resolver'


const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);

let handler: ReturnType<typeof startServerAndCreateNextHandler>;

const getServerHandler = async () => {
  handler ??= startServerAndCreateNextHandler(server);
};

export async function GET(request: NextRequest) {
  await getServerHandler();
  return handler(request);
}

export async function POST(request: NextRequest) {
  await getServerHandler();
  return handler(request);
}