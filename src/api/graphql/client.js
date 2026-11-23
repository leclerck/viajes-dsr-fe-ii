import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const base = import.meta.env.BASE_URL

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${base}graphql` }),
  cache: new InMemoryCache(),
})
