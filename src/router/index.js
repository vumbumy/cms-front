import Vue from 'vue';
import Router from 'vue-router';
import Home from "../components/Home";
import Tabs from "../components/Tabs";
import Detail from "../components/Detail";


Vue.use(Router);

/* Const Routes */
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/tabs',
            component: Tabs
        },
        {
            path: '/tabs/:id',
            components: {
                default: Tabs,
                detail: Detail
            }
        },
    ]
});