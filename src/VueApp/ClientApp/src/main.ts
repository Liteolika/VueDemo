import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import { initAxios } from "./services/api";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

new Vue({
    router,
    created() {
        //initAxios();
    },
    render: (h) => h(App),
    store
}).$mount("#app");