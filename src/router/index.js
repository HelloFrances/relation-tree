import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index'

import demo from './demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        ...demo.routes
      ],
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
