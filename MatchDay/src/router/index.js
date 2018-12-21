import Vue from 'vue'
import Router from 'vue-router'
import PlayArea from '@/components/PlayArea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Playarea',
      component: PlayArea
    }
  ]
})
