import Vue from 'vue'
import Vuex from 'vuex'
import request from '../request'

Vue.use(Vuex)


export default new Vuex.Store({
  
  /* 全局状态 类似于组件里的 data，
  用于存储应用中需要共享的数据。
  可以在组件中用 this.$store.state.count 来访问它*/
  state: {  
                    // TODO 部门数据 
  },      

  /* 同步修改state的方法
  在组件中这样调用:
  this.$store.commit('increment')
  this.$store.commit('setUser', { name: '小明', token: 'abc123' })
  */
  mutations: {  

  },  


  /* 用于执行异步操作（如：请求 API），然后通过 commit 调用 mutation 修改状态。
  例：
    async fetchUser({ commit }) {
      const res = await axios.get('/api/user')
      commit('setUser', res.data)
    }
  在组件中调用：
  this.$store.dispatch('fetchUser')*/
  actions: {  

  },  

  /* 用于将 store 分割成模块（module），每个模块有自己的 state、mutations、actions 等，适用于大型项目。 */
  modules: {  

  }     // 模块化管理子 store
})

