import Vue from 'vue'
import apolloClient from './apollo-client'
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);


const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}