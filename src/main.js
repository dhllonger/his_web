import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'


import './assets/font/iconfont.css'
import './assets/font/iconfont.js'

// 导入全局样式表
import './assets/css/global.css'


const instance = axios.create({
  baseURL: 'http://localhost:5003',
  withCredentials: true
})

instance.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  config.headers['Content-Type'] = 'application/json'
  return config
})

Vue.prototype.$http = instance


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
