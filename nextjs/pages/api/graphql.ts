import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolver'
import type { NextApiRequest, NextApiResponse } from 'next'

const apolloServer = new ApolloServer({ cache: 'bounded',typeDefs, resolvers })

const startServer = apolloServer.start()


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    await startServer;
    await apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res);
  }
  export const config = {
    api: {
      bodyParser: false,
    },
  };