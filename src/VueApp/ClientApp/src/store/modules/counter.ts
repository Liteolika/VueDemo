import { BareActionContext } from "vuex-typex"
import { storeBuilder, RootState } from "@/store/RootState";

// state
export class CounterState {
    currentCount: number = 0
}

const b = storeBuilder.module<CounterState>("counter", new CounterState());

// getters
const currentCount = b.read((state) => state.currentCount, "getCurrentCount");

export const getters = {
    get getCurrentCount() {
        return currentCount();
    },
}

// mutations
function setCount(state: CounterState, delta: number) {
    state.currentCount = state.currentCount + delta;
}

export const mutations = {
    setCount: b.commit(setCount),
}

// actions
type ActionContext = BareActionContext<CounterState, RootState>

async function increment(context: ActionContext) {
    mutations.setCount(1);
    
    //https://github.com/vinicius0026/properly-typed-vuex-stores/blob/master/src/store/modules/auth.ts
}

async function decrement(context: ActionContext) {
    mutations.setCount(-1);
}

async function incrementLoop(context: ActionContext, payload: { loopCount: number }) {

    let theLoop: (i: number) => void = (i: number) => {
        setTimeout(() => {
            mutations.setCount(1);
            if (--i) {
                theLoop(i);
            }
        }, 3000);
    };

    theLoop(payload.loopCount);
}

export const actions = {
    incrementLoop: b.dispatch(incrementLoop),
    increment: b.dispatch(increment),
    decrement: b.dispatch(decrement)
}



