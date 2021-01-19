import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Tabs from "../pages/Tabs";
import SettingsTabs from "../pages/settings/SettingsTabs";
import GeneralTab from "../pages/settings/GeneralTab";
import NoticeTab from "../pages/settings/NoticeTab";
import AccountTab from "../pages/settings/AccountTab";
import ProductsTab from "../pages/commercial/products/ProductsTab";
import ProductsDetail from "../pages/commercial/products/ProductDetail";
import OrdersTab from "../pages/commercial/orders/OrdersTab";
import OrderDetail from "../pages/commercial/orders/OrderDetail";
import NotFoundComponent from "../components/NotFoundComponent";
import AgreementsTab from "../pages/commercial/agreements/AgreementsTab";
import AgreementDetail from "../pages/commercial/agreements/AgreementDetail";

import {publicPath} from "../../vue.config";
import TemplatesTab from "../pages/commercial/templates/TemplatesTab";
import TemplateDetail from "../pages/commercial/templates/TemplateDetail";
import CommercialTabs from "../pages/commercial/CommercialTabs";


Vue.use(Router);

/* Const Routes */
export default new Router({
    mode: 'hash',
    base: publicPath,
    routes: [
        {
            name: 'home',
            path: '/',
            icon: 'mdi-view-quilt',
            component: Home,
        },
        {
            path: '/settings',
            icon: 'mdi-cog',
            component: SettingsTabs,
            children: [
                {
                    name: "settings",
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
            path: '/logs',
            icon: 'mdi-card-text',
            component: Tabs,
            children: [
                {
                    name: "logs",
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
            path: '/commercial',
            icon: 'mdi-bulletin-board',
            component: CommercialTabs,
            children: [
                {
                    name: "commercial",
                    path: '',
                    redirect: 'products'
                },
                {
                    name: 'products',
                    path: 'products',
                    component: ProductsTab,
                },
                {
                    name: 'products:detail',
                    path: 'products/:sku',
                    components: {
                        default: ProductsTab,
                        detail: ProductsDetail
                    },
                },
                {
                    name: 'orders',
                    path: 'orders',
                    components: {
                        default: OrdersTab,
                    },
                },
                {
                    name: 'orders:detail',
                    path: 'orders/:no',
                    components: {
                        default: OrdersTab,
                        detail: OrderDetail
                    },
                },
                // {
                //     name: 'cart',
                //     path: 'cart',
                // },
                // {
                //     name: 'orderList',
                //     path: 'orderList',
                // },
                {
                    name: 'agreements',
                    path: 'agreements',
                    components: {
                        default: AgreementsTab
                    },
                },
                {
                    name: 'agreements:detail',
                    path: 'agreements/:no',
                    components: {
                        default: AgreementsTab,
                        detail: AgreementDetail
                    },
                },
                {
                    name: 'templates',
                    path: 'templates',
                    components: {
                        default: TemplatesTab,
                    },
                },
                {
                    name: 'templates:detail',
                    path: 'templates/:no',
                    components: {
                        default: TemplatesTab,
                        detail: TemplateDetail
                    },
                },
                // {
                //     name: 'reports',
                //     path: 'reports',
                // },
                // {
                //     name: 'quotations',
                //     path: 'quotations',
                // }
            ]
        },
        {
            path: '/contents',
            icon: 'mdi-animation-play',
            component: Tabs,
            children: [
                {
                    name: "contents",
                    path: '',
                    redirect: 'packages'
                },
                {
                    name: 'contentPackages',
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
            path: '/works',
            icon: 'mdi-briefcase',
            component: Tabs,
            children: [
                {
                    name: "works",
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
            path: '/boards',
            icon: 'mdi-play-network',
            component: Tabs,
            children: [
                {
                    name: "boards",
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
                    name: 'boardPackages',
                    path: 'packages',
                },
                {
                    name: 'transactions',
                    path: 'transactions',
                }
            ]
        },
        { path: '*', component: NotFoundComponent },
    ]
});
