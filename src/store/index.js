import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './tasks'
import user from './user'
import windowSize from './window/window-size'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ( /* { ssrContext } */ ) {
  let Store = new Vuex.Store({
    modules: {
      tasks,
      user,
      windowSize
    }
  })
  return Store
}
