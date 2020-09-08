import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from "vuex-module-decorators";
import store from "@/store";
import authService from "@/services/auth";

@Module({
    namespaced: true,
    name: "auth",
    store: store,
    dynamic: true,
    preserveState: false
})
class AuthModule extends VuexModule {

    _isLoggedIn: boolean = false;

    @Action({rawError: true})
    public login() {
        this.context.commit("setLoggedIn", true);
    }

    @Action({ rawError: true })
    public logout() {
        this.context.commit("setLoggedIn", false);
    }

    @Mutation
    public setLoggedIn(loggedIn: boolean) {
        console.log(this);
        this._isLoggedIn = loggedIn;
    }

    public get isLoggedIn(): boolean | null { return this._isLoggedIn; }

    //@Mutation
    //private setLoggedOut() {
    //    this.isLoggedIn = false;
    //}
    // https://github.com/championswimmer/vuex-module-decorators/issues/171

}
export default getModule(AuthModule);

//// https://dev.to/sirtimbly/type-safe-vuex-state-usage-in-components-without-decorators-2b24
//// https://codeburst.io/vuex-and-typescript-3427ba78cfa8
//// https://polyrithm-technologies.storychief.io/vuex-with-typescript
