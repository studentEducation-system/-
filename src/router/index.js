import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import axios from '@/toolsFunc/axios.js'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  redirect: '/myResume/viewResume',
  children: [
    {
      path: 'myResume',
      name: 'myResume',
      component: () => import('@/views/MyResume/index.vue'),
      // redirect: '/myResume/addResume',
      children: [
      {
        path: 'addResume',
        name: 'addResume',
        component: () => import('@/views/MyResume/component/addResume.vue')
      },
      {
        path: 'updateResume',
        name: 'updateResume',
        component: () => import('@/views/MyResume/component/updateResume.vue')
      },
      {
        path: 'viewResume',
        name: 'viewResume',
        component: () => import('@/views/MyResume/component/viewResume.vue')
      }]
    },
    {
      path: 'jobInfo',
      name: 'jobInfo',
      component: () => import('@/views/JobInfo/index.vue')
    },
    {
      path: 'recruitStatistic',
      name: 'recruitStatistic',
      component: () => import('@/views/RecruitStatistic/index.vue')
    },
    {
      path: 'deliveryFeedback',
      name: 'deliveryFeedback',
      component: () => import('@/views/DeliveryFeedback/index.vue')
    }

  ]
},
{
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login/index.vue')
},
{
  path: '/register',
  name: 'register',
  component: () => import('@/views/Register/index.vue')
}, {
  path: '/applyCount',
  name: 'applyCount',
  component: () => import('@/views/applyCount/index.vue')
}]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/applyCount') {
    next();
  } else {
    let sessionId = document.cookie.split(';');
    sessionId = sessionId.filter((ele) => {
      return ele.includes('sessionId');
    })
    sessionId = sessionId[0] && sessionId[0].split('=')[1].trim()
    axios({
      method: 'post',
      url: 'judgeLogin',
      data: {
        session: sessionId,
      }
    }).then((res) => {
      if (res) {
        next()
      } else {
        Vue.prototype.$message.error('您还没有权限，请先登录');
        setTimeout(() => {
          location.href = '/login'

        }, 1000);
      }
    }, (err) => {

    })

  }

});

export default router