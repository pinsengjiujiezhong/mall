import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
Vue.use(VueAxios,axios);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
