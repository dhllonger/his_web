import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

const instance0 = axios.create({
  baseURL: 'http://localhost:808'
})
Vue.prototype.$http = instance0


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
