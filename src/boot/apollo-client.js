import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  Loading,
} from 'quasar'

const BASE_URL = process.env.BASE_URL;

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: BASE_URL + '/graphql',
});

const interceptor = new ApolloLink((operation, forward)=>{
   console.log(`starting request`,operation);
   Loading.show();
   return forward(operation).map((data) => {
    console.log(`ending request for ${operation.operationName}`,data);
    Loading.hide();
    return data;
  })
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: interceptor.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;