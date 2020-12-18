import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Tabs from "../pages/tabs/Tabs";
import TabItem from "../pages/tabs/TabItem";
import Sub1Detail from "../pages/tabs/sub1/SubDetail";
import Sub2Detail from "../pages/tabs/sub2/SubDetail";
import Sub1ListItem from "../pages/tabs/sub1/SubListItem";
import Sub2ListItem from "../pages/tabs/sub2/SubListItem";


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
                    component: TabItem,
                    children: [
                        {
                            path: '',
                            component: Sub1ListItem
                        }
                    ]
                },
                {
                    path: 'sub1',
                    components: {
                        default: TabItem,
                        detail: Sub1Detail
                    },
                    children: [
                        {
                            path: '',
                            component: Sub1ListItem
                        },
                        {
                            path: ':id',
                            component: Sub1ListItem
                        }
                    ]
                },
                {
                    path: 'sub2',
                    components: {
                        default: TabItem,
                        detail: Sub2Detail
                    },
                    children: [
                        {
                            path: '',
                            component: Sub2ListItem
                        },
                        {
                            path: ':id',
                            component: Sub2ListItem
                        }
                    ]
                }
            ]
        },
        // {
        //     path: '/tabs/sub1',
        //     components: {
        //         default: Tabs,
        //
        //         tab: TabItem,
        //         detail: SubDetail
        //     },
            // children: [
            //     {
            //         name: 'Sub 1',
            //         path: ':id',
            //         component: Detail
            //     },
                // {
                //     name: 'None',
                //     path: '',
                //     component: Detail
                // }
            // ]
        // }
    ]
});