import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Animation from '@/components/Animation'
import Queue from '@/components/Queue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloAnimationWorld',
      component: Queue
    },
    {
      path: '/a',
      name: 'HelloAnimationWorld',
      component: Animation
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
