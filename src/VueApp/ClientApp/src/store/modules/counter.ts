import { Store, ActionContext } from "vuex";

import { IRootState } from "..";
import { COUNTER_INCREMENT, COUNTER_DECREMENT } from "../actions.type";

// getters
const getters = {

};

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
