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
            name: 'Title',
            path: '/tabs',
            component: Tabs,
            props: {
                tabs: ['Sub 1', 'Sub 2' ,'Sub 3']
            }
        },
        {
            name: 'Title',
            path: '/tabs/:id',
            components: {
                default: Tabs,
                detail: Detail
            },
            props: {
                default: {tabs: ['Sub 1', 'Sub 2' ,'Sub 3']}
            }
        },
    ]
});