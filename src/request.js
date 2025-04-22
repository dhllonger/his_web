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

// 响应拦截器
// TODO 处理Token失效，重新登录

export default instance
