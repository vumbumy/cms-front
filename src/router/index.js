import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Tabs from "../pages/commercial/Tabs";
import Sub1Detail from "../pages/commercial/sub1/SubDetail";
import Sub2Detail from "../pages/commercial/sub2/SubDetail";
import Sub1Tab from "../pages/commercial/sub1/Sub1Tab";
import Sub2Tab from "../pages/commercial/sub2/Sub2Tab";
import SettingsTabs from "../pages/settings/SettingsTabs";
import GeneralTab from "../pages/settings/GeneralTab";
import NoticeTab from "../pages/settings/NoticeTab";
import AccountTab from "../pages/settings/AccountTab";


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
                        default: Sub1Tab,
                        detail: Sub1Detail
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
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'orderList',
                    path: 'orderList',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
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
                    components: {
                        default: Sub1Tab,
                        detail: Sub1Detail
                    },
                },
                {
                    name: 'scenes',
                    path: 'scenes',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'pages',
                    path: 'pages',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
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
                    redirect: 'workHistory'
                },
                {
                    name: 'workHistory',
                    path: 'workHistory',
                    components: {
                        default: Sub1Tab,
                        detail: Sub1Detail
                    },
                },
                {
                    name: 'messages',
                    path: 'messages',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'approvals',
                    path: 'approvals',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'reports',
                    path: 'reports',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
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
                    components: {
                        default: Sub1Tab,
                        detail: Sub1Detail
                    },
                },
                {
                    name: 'resourcePlans',
                    path: 'resourcePlans',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'reservations',
                    path: 'reservations',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'packages',
                    path: 'packages',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                },
                {
                    name: 'payments',
                    path: 'payments',
                    components: {
                        default: Sub2Tab,
                        detail: Sub2Detail
                    },
                }
            ]
        },
    ]
});
