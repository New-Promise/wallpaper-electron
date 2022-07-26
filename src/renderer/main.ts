import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import '@/assets/iconfont/iconfont.css'

declare var process: {
  env: {
    NODE_ENV: string,
    IS_WEB: boolean
  }
}

if (!process.env.IS_WEB) { Vue.use(require('vue-electron')) }
Vue.config.productionTip = false
Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
