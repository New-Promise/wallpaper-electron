import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
  ],
  strict: process.env.NODE_ENV !== 'production'
})
