import Vue from "vue";
import Router, { Route, NavigationGuardNext } from "vue-router";
import Store from "./store";
import Home from "./views/Home.vue";
import Secret from "./views/Secret.vue";
import Unauthorized from "./views/Unauthorized.vue";
import About from "./views/About.vue";

import AuthService from "./services/auth";

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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Counter" */ "./views/Counter.vue"),
    },
    {
        path: "/secret",
        name: "secret",
        meta: {
            requiresAuth: true
        },
        component: Secret
    },
    {
        path: "/unauthorized",
        name: "Unauthorized",
        component: Unauthorized
    }
];

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: routes
});


router.beforeEach((to, from, next) => {
    const authService = new AuthService();

    if (to.matched.some(record => record.meta.requiresAuth)) {
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
                }).catch(error => {
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