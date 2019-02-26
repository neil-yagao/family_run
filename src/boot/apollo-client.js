import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const BASE_URL = process.env.BASE_URL;

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: BASE_URL + '/graphql',
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;