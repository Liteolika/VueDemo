import { getStoreBuilder, VuexStoreOptions } from "vuex-typex"
import { AuthState } from "./modules/auth";
import { CounterState } from "./modules/counter";

export interface RootState {
    auth: AuthState;
    counter: CounterState;
}

export const persistedStates: string[] = [
    "counter"
];

export const storeBuilder = getStoreBuilder<RootState>();