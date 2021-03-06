import Vue from "vue"
import VueRouter from 'vue-router'
import Home from '../pages/home'
import Index from '../pages/index'
import Login from '../pages/login'
import Cart from '../pages/cart'
import Detail from '../pages/detail'
import Order from '../pages/order'
import OrderConfirm from '../pages/orderConfirm'
import OrderList from '../pages/orderList'
import OrderPay from '../pages/orderPay'
import Product from '../pages/product1'
import Alipay from '../pages/alipay'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                }, {
                    path: '/product/:id',
                    name: 'product',
                    component: Product,
                }, {
                    path: '/detail/:id',
                    name: 'detail',
                    component: Detail
                }
            ]
        },{
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/cart',
            name: 'cart',
            component: Cart
        }, {
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: OrderConfirm,
                }, {
                    path: 'list',
                    name: 'order-list',
                    component: OrderList,
                }, {
                    path: 'pay',
                    name: 'order-pay',
                    component: OrderPay,
                }, {
                    path: 'alipay',
                    name: 'alipay',
                    component: Alipay
                }
            ]
        }
    ]
})
