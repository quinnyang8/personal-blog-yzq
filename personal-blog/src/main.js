import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

import 'font-awesome/css/font-awesome.min.css'

import 'fullpage.js/vendors/scrolloverflow' 
import VueFullPage from 'vue-fullpage.js'
import 'fullpage.js/dist/fullpage.min.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


import checkView from 'vue-check-view'

Vue.use(mavonEditor)
Vue.use(animated)
Vue.use(checkView)



Vue.use(VueFullPage)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  store:store,
  router:router,
  render: h => h(App),
}).$mount('#app')
