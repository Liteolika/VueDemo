<template>
    <div id="app" class="container-fluid">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/counter">Counter</router-link> |
            <router-link to="/about">About</router-link> 
            

        </div>
        <router-view />
    </div>
</template>

<script lang="ts">


    import { Component, Vue } from "vue-property-decorator";

    import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)

    @Component
    export default class App extends Vue {
    }
</script>