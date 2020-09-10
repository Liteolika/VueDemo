import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Secret from "./views/Secret.vue";
import Unauthorized from "./views/Unauthorized.vue";
import About from "./views/About.vue";
import OidcCallback from "./views/OidcCallback.vue";
import OidcSilentRenew from "./views/OidcSilentRenew.vue";
import OidcSignoutCallback from "./views/OidcSignoutCallback.vue";

import Editor from "./views/Editor.vue";
import Chat from "./views/Chat.vue";
import Counter from "@/views/Counter.vue";

import authService from "./services/auth";

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/counter",
        name: "counter",
        component: Counter,
    },
    {
        path: "/secret",
        name: "secret",
        meta: { requiresAuth: true },
        component: Secret
    },
    {
        path: "/unauthorized",
        name: "Unauthorized",
        component: Unauthorized
    },
    {
        path: "/oidc-callback",
        name: "oidc-callback",
        component: OidcCallback
    },
    {
        path: "/oidc-signout-callback",
        name: "oidc-signout-callback",
        component: OidcSignoutCallback
    },
    {
        path: "/oidc-silent-renew",
        name: "oidc-silent-renew",
        component: OidcSilentRenew
    },
    {
        path: "/editor",
        name: "editor",
        component: Editor
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat
    }
];

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach((to, from, next) => {

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        authService.isLoggedIn().then((isLoggedIn: boolean) => {
            if (isLoggedIn) {
                next();
            } else {
                authService.login().then(() => {
                    next({
                        path: "/",
                        query: { redirect: to.fullPath }
                    });
                }).catch((error) => {
                    console.log(error);
                    next();
                });
            }
        });
    } else {
        next();
    }
});

export default router;
