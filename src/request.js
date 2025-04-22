// src/request.js

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5003',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  config.headers['Content-Type'] = 'application/json'
  return config
})

export default instance
