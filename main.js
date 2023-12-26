import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from '@/store/index.js'

// uview引入和挂载
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// api引入和挂载
import api from './api/index.js'
Vue.prototype.$api = api

// vuex 引入和挂载
Vue.prototype.$store = store


import notifyBar from '@/components/notify/notifyBar.vue'
Vue.component('notifyBar', notifyBar)

// 时间方法封装
import dateFormatter from '@/utils/dateFormatter'
Vue.prototype.dateFormatter = dateFormatter;

// 消息提示封装   // this.$api.msg("id只能填写数字");
import showToast from './utils/showToast.js'
Vue.prototype.$api = showToast;

// 引入请求封装，将app参数传递到配置中
require('./utils/http.js')(app)
console.log("main")
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
	store,
    app
  }
}
// #endif