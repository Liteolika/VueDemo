import { Store, ActionContext } from "vuex"

import { RootState } from "..";
import { COUNTER_INCREMENT, COUNTER_DECREMENT } from "../actions.type";

// initial state
const state = () => ({
    count: 10
});

// getters
const getters = {

}

// actions
const actions = {
    [COUNTER_INCREMENT](context: ActionContext<CounterState, RootState>) {
        context.commit("increment");
    },
    [COUNTER_DECREMENT](context: ActionContext<CounterState, RootState>) {
        context.commit("decrement");
    }
}

// mutations
const mutations = {
    increment(state: CounterState) {
        state.count++;
    },
    decrement(state: CounterState) {
        state.count--;
    }
}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
}

export interface CounterState {
    count: number;
}