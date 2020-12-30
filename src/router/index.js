import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Tabs from "../pages/commercial/Tabs";
import Sub2Detail from "../pages/commercial/sub2/SubDetail";
import Sub2Tab from "../pages/commercial/sub2/Sub2Tab";
import SettingsTabs from "../pages/settings/SettingsTabs";
import GeneralTab from "../pages/settings/GeneralTab";
import NoticeTab from "../pages/settings/NoticeTab";
import AccountTab from "../pages/settings/AccountTab";
import ProductsTab from "../pages/commercial/products/ProductsTab";
import ProductsDetail from "../pages/commercial/products/ProductsDetail";


Vue.use(Router);

/* Const Routes */
export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            icon: 'mdi-view-quilt',
            component: Home,
        },
        {
            name: "settings",
            path: '/settings',
            icon: 'mdi-cog',
            component: SettingsTabs,
            children: [
                {
                    path: '',
                    redirect: 'general'
                },
                {
                    name: "general",
                    path: 'general',
                    component: GeneralTab,
                },
                {
                    name: 'notice',
                    path: 'notice',
                    component: NoticeTab,
                },
                {
                    name: 'account',
                    path: 'account',
                    component: AccountTab,
                },
            ]
        },
        {
            name: "logs",
            path: '/logs',
            icon: 'mdi-card-text',
            component: Tabs,
            children: [
                {
                    path: '',
                    redirect: 'alert'
                },
                {
                    name: "alert",
                    path: 'alert',
                },
                {
                    name: 'boardAlert',
                    path: 'board',
                },
                {
                    name: 'contentAlert',
                    path: 'content',
                },
            ]
        },
        {
            name: "commercial",
            path: '/commercial',
            icon: 'mdi-bulletin-board',
            component: Tabs,
            children: [
                {
                    path: '',
                    redirect: 'products'
                },
                {
                    name: 'products',
                    path: 'products',
                    components: {
                        default: ProductsTab,
                        detail: ProductsDetail
                    },
                },
                {
                    name: 'orders',
                    path: 'orders',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'cart',
                    path: 'cart',
                },
                {
                    name: 'orderList',
                    path: 'orderList',
                },
                {
                    name: 'agreements',
                    path: 'agreements',
                },
                {
                    name: 'reports',
                    path: 'reports',
                },
                {
                    name: 'quotations',
                    path: 'quotations',
                }
            ]
        },
        {
            name: "contents",
            path: '/contents',
            icon: 'mdi-animation-play',
            component: Tabs,
            children: [
                {
                    path: '',
                    redirect: 'packages'
                },
                {
                    name: 'packages',
                    path: 'packages',
                },
                {
                    name: 'scenes',
                    path: 'scenes',
                },
                {
                    name: 'pages',
                    path: 'pages',
                },
            ]
        },
        {
            name: "works",
            path: '/works',
            icon: 'mdi-briefcase',
            component: Tabs,
            children: [
                {
                    path: '',
                    redirect: 'history'
                },
                {
                    name: 'workHistory',
                    path: 'history',
                },
                {
                    name: 'messages',
                    path: 'messages',
                },
                {
                    name: 'approvals',
                    path: 'approvals',
                },
                {
                    name: 'reports',
                    path: 'reports',
                }
            ]
        },
        {
            name: "boards",
            path: '/boards',
            icon: 'mdi-play-network',
            component: Tabs,
            children: [
                {
                    path: '',
                    redirect: 'media'
                },
                {
                    name: 'media',
                    path: 'media',
                },
                {
                    name: 'resourcePlans',
                    path: 'resourcePlans',
                },
                {
                    name: 'reservations',
                    path: 'reservations',
                },
                {
                    name: 'packages',
                    path: 'packages',
                },
                {
                    name: 'transactions',
                    path: 'transactions',
                }
            ]
        }
    ]
});
