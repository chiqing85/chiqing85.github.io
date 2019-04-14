import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazy from 'vue-lazyload'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(lazy, {
  loading: require('@/assets/img/album_300.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
