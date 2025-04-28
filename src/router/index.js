import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
<<<<<<< HEAD
import PatientBaseInfo from '../components/PatientBaseInfo.vue'
=======
>>>>>>> b65eb77edd33d23bbfd25f1254602c5f3e470f98
// import { component } from 'vue/types/umd'

Vue.use(Router)

const routes = [
  { path:'/login',component: Login},
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
<<<<<<< HEAD
      {path: '/patientInfo',component: PatientBaseInfo}
=======
      
>>>>>>> b65eb77edd33d23bbfd25f1254602c5f3e470f98
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new Router({
  routes
})

export default router
