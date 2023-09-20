import { createRouter, createWebHistory } from 'vue-router'
import Data_sourceVue from '../Services/Data_source.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ingreso',
      component: Data_sourceVue
    },
   
    {
        path: '/resultado',
        name: 'api',
        component: () => import('../Services/Result.vue')
      }
  ]
})

export default router
