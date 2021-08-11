/*
* 商城 vuex-mutations
*
* */
export default {
    saveCartCount (state, payload) {
        state.cartCount = payload;
    },
    saveUserName (state, payload) {
        state.username = payload;
    }
}
