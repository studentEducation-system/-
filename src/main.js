import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/icon.css'
import '@/assets/style/reset.css'
import '@/assets/style/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/toolsFunc/axios.js'
import cookie from '@/toolsFunc/cookie.js'

Vue.use(ElementUI);
Vue.prototype.$ajax = axios;
Vue.prototype.$cookie = cookie;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
