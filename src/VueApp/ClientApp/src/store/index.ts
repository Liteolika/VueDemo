import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { storeBuilder, RootState, persistedStates } from "./RootState"
import VuexPersistence, { PersistOptions } from "vuex-persist";

Vue.use(Vuex);

const persistOptions: PersistOptions<RootState> =
{
    modules: persistedStates
};

const vuexPersist = new VuexPersistence<RootState>(persistOptions);

const storeOptions: StoreOptions<RootState> = {
    plugins: [ vuexPersist.plugin ]
};

export default storeBuilder.vuexStore(storeOptions);