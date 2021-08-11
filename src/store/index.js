import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'


Vue.use(Vuex)
const state = {
    cartCount: 0,  //购物车商品效果
    username: ''  //登录用户名
}

export default new Vuex.Store({
        state,
        actions,
        mutations
})
