import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Tabs from "../pages/tabs/Tabs";
// import TabItem from "../pages/tabs/TabItem";
import Sub1Detail from "../pages/tabs/sub1/SubDetail";
import Sub2Detail from "../pages/tabs/sub2/SubDetail";
// import Sub1ListItem from "../pages/tabs/sub1/Sub1ListItem";
// import Sub2ListItem from "../pages/tabs/sub2/SubListItem";
import Sub1Tab from "../pages/tabs/sub1/Sub1Tab";
import Sub2Tab from "../pages/tabs/sub2/Sub2Tab";



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
            children: [
                {
                    path: '',
                    component: Sub1Tab,
                },
                {
                    path: 'sub1',
                    components: {
                        default: Sub1Tab,
                        detail: Sub1Detail
                    },
                },
                {
                    path: 'sub2',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                }
            ]
        },
    ]
});