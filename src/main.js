import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import { Message } from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;
  let path = location.hash
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});
Vue.use(VueAxios,axios);
Vue.use(VueCookies)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

