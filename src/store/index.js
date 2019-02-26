import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './tasks'
import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ( /* { ssrContext } */ ) {
  let Store = new Vuex.Store({
    modules: {
      tasks,
      user
    }
  })
  return Store
}
