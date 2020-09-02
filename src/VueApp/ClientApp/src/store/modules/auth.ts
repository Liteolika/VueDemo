//import { Store, ActionContext } from "vuex";

//import { RootState } from "..";
//import { AUTH_LOGIN } from "../actions.type";

//// initial state
//const initialState = (): AuthState => ({
//    authenticated: false,
//    username: ""
//});

//// getters
//const getters = {

//};

//const AUTH_SUCCESS = "auth_success";

//// actions
//const actions = {
//    async [AUTH_LOGIN](context: ActionContext<AuthState, RootState>) {
//        context.commit(AUTH_SUCCESS);
//    }
//    //[COUNTER_INCREMENT](context: ActionContext<CounterState, RootState>) {
//    //    context.commit("increment");
//    //},
//    //[COUNTER_DECREMENT](context: ActionContext<CounterState, RootState>) {
//    //    context.commit("decrement");
//    //}
//};

//// mutations
//const mutations = {

//    [AUTH_SUCCESS](state: AuthState) {
//        state.authenticated = false;
//        state.username = "";
//    }
//    //increment(state: AuthState) {
//    //    state.count++;
//    //},
//    //decrement(state: AuthState) {
//    //    state.count--;
//    //}
//};

//export default {
//    namespaced: false,
//    state: initialState,
//    getters,
//    actions,
//    mutations
//};

//export interface AuthState {
//    authenticated: boolean;
//    username: string;
//}
