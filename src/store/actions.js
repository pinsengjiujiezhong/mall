/*
* 商城 vuex-actions
*
* */
import axios from 'axios';
export default {
    getUserName (context) {
        axios.get('/user').then((res) => {
            console.log('res.username: ', res.username)
            return context.commit('saveUserName', res.username)
        })

    },
    getCartCount (context) {
        axios.get('/carts/products/sum').then((res) => {
            return context.commit('saveCartCount', res)
        })

    },
}
