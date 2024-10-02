// graphql/schema.ts
import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Card {
    id:ID,
    front:String,
    back:String,
  }

  type Image {
    id:ID,
    url: String,
    data: String,
  }

  type Result {
    ok:Boolean!,
  }

  type Query {
    read: [Card],
  }

  type Mutation {
    create(front: String, back: String): Result
#    update(id: ID!, name: String, email: String): Result
 #   delete(id:ID!): Result
  }
`
