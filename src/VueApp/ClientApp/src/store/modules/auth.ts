import { BareActionContext } from "vuex-typex"
import { storeBuilder, RootState } from "@/store/RootState";
import { User, Profile } from "oidc-client";

// state
export class AuthState {
    loggedIn: boolean = false;
    profile: Profile | null = null;
}

const b = storeBuilder.module<AuthState>("auth", new AuthState());

// getters
const isLoggedIn = b.read((state) => state.loggedIn, "isLoggedIn");
const getProfile = b.read((state) => state.profile, "getProfile");

export const getters = {
    get isLoggedIn() { return isLoggedIn(); },
    get getProfile() { return getProfile(); }
}

// mutations
function setIsLoggedIn(state: AuthState, payload: { loggedIn: boolean, profile: Profile|null }) {
    state.loggedIn = payload.loggedIn;
    state.profile = payload.profile;
    console.log(state);
};

export const mutations = {
    setIsLoggedIn: b.commit(setIsLoggedIn),
}

// actions

type ActionContext = BareActionContext<AuthState, RootState>

async function login(context: ActionContext, user: User) {
    mutations.setIsLoggedIn({ loggedIn: true, profile: user.profile });
}

async function logout(context: ActionContext) {
    mutations.setIsLoggedIn({ loggedIn: false, profile: null });
}

export const actions = {
    login: b.dispatch(login),
    logout: b.dispatch(logout)
}

