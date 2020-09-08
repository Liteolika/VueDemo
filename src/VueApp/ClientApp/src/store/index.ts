import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import VuexPersistence, { PersistOptions } from "vuex-persist";
import createPersistedState from "vuex-persistedstate";

import { CountModule } from "@/store/modules/count";
import { AuthModule } from "@/store/modules/auth";

Vue.use(Vuex);

interface StoreType {
    count: CountModule,
    auth: AuthModule,
}

let vuexLocal = new VuexPersistence<StoreType>({
    storage: localStorage,
    key: "siallo"
});

const dataState = createPersistedState({
    paths: ['data']
});

let store = new Vuex.Store<StoreType>({
    plugins: [createPersistedState()]
});



export default store;

