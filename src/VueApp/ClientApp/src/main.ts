import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { initAxios } from "./services/api";

Vue.config.productionTip = false;

new Vue({
    router,
    created() {
        initAxios();
    },
    render: (h) => h(App),
}).$mount("#app");