//import Vue from "vue";
//import Vuex, { StoreOptions, createLogger } from "vuex";
//import VuexPersistence, { PersistOptions } from "vuex-persist";

//import counterStore, { CounterState } from "./modules/counter";
//import authStore, { AuthState } from "./modules/auth";



//Vue.use(Vuex);

//const persistOptions: PersistOptions<IRootState> = {
//    key: "counterstate",
//    storage: window.localStorage,
//    modules: ["counter"]
//};

//const vuexLocal = new VuexPersistence<IRootState>(persistOptions);

//const storeOptions: StoreOptions<IRootState> = {
//    plugins: [
//        createLogger(),
//        vuexLocal.plugin
//    ],
//    modules: {
//        counter: counterStore,
//        auth: authStore
//    }
//};

//export default new Vuex.Store<IRootState>(storeOptions);

//export interface IRootState {
//    counter: CounterState;
//    auth: AuthState;
//}

import Vue from "vue";
import Vuex from "vuex";
//import VuexPersist from "vuex-persist";
import VuexPersistence, { PersistOptions } from "vuex-persist";
//import { getModule } from "vuex-module-decorators";

Vue.use(Vuex);

//import Counter from "./modules/counter";

const vuexLocalStorage = new VuexPersistence({
    key: "vuex", // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});

const store = new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    modules: {},
    plugins: [
        vuexLocalStorage.plugin
    ]
});

export default store;

