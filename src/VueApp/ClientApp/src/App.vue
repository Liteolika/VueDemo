﻿<template>
    <div id="app" class="">
        <!--<div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/counter">Counter</router-link> |
            <router-link to="/secret">Secret</router-link> |
            <router-link to="/about">About</router-link>
        </div-->

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            
                <a class="navbar-brand" href="#">
                    <img alt="Vue logo" width="30" height="30" loading="lazy" src="./assets/logo.png">
                    Vue Demo Project
                </a>

                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">
                        <span class="navbar-toggler-icon"></span>
                    </span>
                </button>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/counter">Counter</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/secret">Secret</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/editor">Editor</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/chat">Chat</router-link>
                        </li>
                    </ul>
                </div>

        </nav>

        <div class="container-fluid">
            <router-view />
        </div>

    </div>
</template>

<script lang="ts">

    import Vuex from "vuex";
    import { Component, Vue } from "vue-property-decorator";

    import { BootstrapVue, IconsPlugin } from "bootstrap-vue";


    import "@/style/sandstone/index.scss";

    import "devextreme/dist/css/dx.common.css";
    import "devextreme/dist/css/dx.light.css";

    //https://bootstrap-vue.org/docs/reference/theming

    import Vue2Editor from "vue2-editor";

    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    //Vue.use(Vue2Editor);
    Vue.use(Vuex);

    @Component
    export default class App extends Vue {
    }

</script>