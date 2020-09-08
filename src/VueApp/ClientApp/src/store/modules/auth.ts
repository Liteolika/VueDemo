import { VuexModule, Module, getModule, Action, Mutation } from "vuex-module-decorators";
import store from "@/store";

@Module({
    namespaced: true,
    name: "auth",
    store: store,
    dynamic: true,
    preserveState: true
})
export class AuthModule extends VuexModule {

    private loggedIn: boolean = false;

    @Action({ rawError: true })
    public login() {
        this.context.commit("setLoggedIn", true);
    }

    @Action({ rawError: true })
    public logout() {
        this.context.commit("setLoggedIn", false);
    }

    @Mutation
    public setLoggedIn(loggedIn: boolean) {
        this.loggedIn = loggedIn;
    }

    public get isLoggedIn(): boolean | null { return this.loggedIn; }

}
export default getModule(AuthModule);
