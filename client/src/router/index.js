import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TabbedView from '@/components/TabbedView'
import Animation from '@/components/Animation'
import Queue from '@/components/Queue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Queue',
      component: Queue
    },
    {
      path: '/a',
      name: 'Animation',
      component: Animation
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/t',
      name: 'TabbedView',
      component: TabbedView
    }
  ]
})
