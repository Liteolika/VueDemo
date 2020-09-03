import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence, { PersistOptions } from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({
    key: "vuex", // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});

const store = new Vuex.Store<any>({
    state: {},
    actions: {},
    mutations: {},
    modules: {},
    plugins: [
        vuexLocalStorage.plugin
    ]
});

export default store;

