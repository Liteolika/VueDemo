import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from "vuex-module-decorators";
import store from "../index";

@Module({
    namespaced: true,
    name: "auth",
    store: store,
    dynamic: true,
    preserveState: true
})
class AuthModule extends VuexModule {

    private isLoggedIn: boolean = false;

    @Action({ commit: "setLoggedIn" })
    public userLoggedIn() {
        return this.isLoggedIn;
    }

    @Action({ commit: "setLoggedOut" })
    public userLoggedOut() {
        return this.isLoggedIn;
    }

    @Mutation
    private setLoggedIn() {
        this.isLoggedIn = true;
    }

    @Mutation
    private setLoggedOut() {
        this.isLoggedIn = false;
    }

}
export default getModule(AuthModule);

//// https://dev.to/sirtimbly/type-safe-vuex-state-usage-in-components-without-decorators-2b24
//// https://codeburst.io/vuex-and-typescript-3427ba78cfa8
//// https://polyrithm-technologies.storychief.io/vuex-with-typescript
