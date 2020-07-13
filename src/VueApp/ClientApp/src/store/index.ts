import Vue from 'vue'
import Vuex, { Store, createLogger } from 'vuex'
import VuexPersistence from 'vuex-persist'

import counter, { CounterState } from "./modules/counterModule"

export * from "./actions.type";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<RootState>({
    key: 'counterstate',
    storage: window.localStorage,
    modules: ["counter"]
})

export default new Vuex.Store<RootState>({
    plugins: [createLogger(), vuexLocal.plugin],
    modules: {
        counter: counter
    },
    mutations: {
    }
})

export interface RootState {
    counter: CounterState;
}