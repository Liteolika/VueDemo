import { Store, ActionContext } from "vuex";

import { IRootState } from "..";
import { COUNTER_INCREMENT, COUNTER_DECREMENT } from "../actions.type";

// getters
const getters = {

};
// https://dev.to/sirtimbly/type-safe-vuex-state-usage-in-components-without-decorators-2b24
// https://codeburst.io/vuex-and-typescript-3427ba78cfa8
// https://polyrithm-technologies.storychief.io/vuex-with-typescript

// actions
const actions = {
    [COUNTER_INCREMENT](context: ActionContext<CounterState, IRootState>) {
        context.commit("increment");
    },
    [COUNTER_DECREMENT](context: ActionContext<CounterState, IRootState>) {
        context.commit("decrement");
    }
};

// mutations
const mutations = {
    increment(state: CounterState) {
        state.count++;
    },
    decrement(state: CounterState) {
        state.count--;
    }
};

// initial state
const initialState = (): CounterState => ({
    count: 10
});

export default {
    namespaced: false,
    initialState,
    getters,
    actions,
    mutations
};

export interface CounterState {
    count: number;
}
