import Vue from "vue";
import Vuex, { StoreOptions, createLogger } from "vuex";
import VuexPersistence, { PersistOptions } from "vuex-persist";

import counterStore, { CounterState } from "./modules/counter";
import authStore, { AuthState } from "./modules/auth";

export * from "./actions.type";

Vue.use(Vuex);

const persistOptions: PersistOptions<RootState> = {
    key: "counterstate",
    storage: window.localStorage,
    modules: ["counter"]
};

const vuexLocal = new VuexPersistence<RootState>(persistOptions);

const storeOptions: StoreOptions<RootState> = {
    plugins: [
        createLogger(),
        vuexLocal.plugin
    ],
    modules: {
        counter: counterStore,
        auth: authStore
    }
};

export default new Vuex.Store<RootState>(storeOptions);

export interface RootState {
    counter: CounterState;
    auth: AuthState;
}
