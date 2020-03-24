import Vue from 'vue'
import Router from 'vue-router'
import cesiumViewer from '@/components/cesiumViewer'
import index from '@/components/index'
import vur from '@/components/vur'
import MapEdit from '@/components/MapEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      hidden:true,
      children:[{
        path:'/vur',
        name:'vur',
        component: vur
      }],
      children:[{
       path:'/MapEdit',
       name:'MapEdit',
       component:MapEdit
       
      }],
      children:[{
      path: '/cesiumViewer',
      name: 'cesiumViewer',
      component: cesiumViewer
      
      }]

    }

  ]
})
