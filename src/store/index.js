import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import env from './env'
import rule from './rule'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      env,
      rule
    },
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./env'], () => {
      const newEnv = require('./env').default
      Store.hotUpdate({ modules: { env: newEnv } })
    })
  }

  return Store
}
