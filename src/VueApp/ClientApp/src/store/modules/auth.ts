import { BareActionContext } from "vuex-typex"
import { storeBuilder, RootState } from "@/store/RootState";

// state
export class AuthState {
    loggedIn: boolean = false
}

const b = storeBuilder.module<AuthState>("auth", new AuthState());

// getters
const isLoggedIn = b.read((state) => state.loggedIn, "isLoggedIn");

export const getters = {
    get isLoggedIn() {
        return isLoggedIn();
    },
}

// mutations
function setIsLoggedIn(state: AuthState, loggedIn: boolean) {
    state.loggedIn = loggedIn;
}

export const mutations = {
    setIsLoggedIn: b.commit(setIsLoggedIn),
}

// actions

type ActionContext = BareActionContext<AuthState, RootState>

async function login(context: ActionContext) {
    mutations.setIsLoggedIn(true);

    //https://github.com/vinicius0026/properly-typed-vuex-stores/blob/master/src/store/modules/auth.ts
}

async function logout(context: ActionContext) {
    mutations.setIsLoggedIn(false);
}


export const actions = {
    login: b.dispatch(login),
    logout: b.dispatch(logout)
}

