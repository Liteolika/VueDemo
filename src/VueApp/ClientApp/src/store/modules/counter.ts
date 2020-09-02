import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from "vuex-module-decorators";
import store from "../index";

@Module({
    namespaced: true,
    name: "counter",
    store: store,
    dynamic: true,
    preserveState: true
})
class CounterModule extends VuexModule {
    private counter: number = 0;

    @Mutation
    public incrementCounter() {
        this.counter++;
    }

    @Mutation
    public decrementCounter() {
        this.counter--;
    }

    @Action({ commit: "incrementCounter" })
    public increment() {
        return this.counter;
    }

    @Action({ commit: "decrementCounter" })
    public decrement() {
        return this.counter;
    }

    public get getCounter() {
        return this.counter;
    }
}
export default getModule(CounterModule);

//// https://dev.to/sirtimbly/type-safe-vuex-state-usage-in-components-without-decorators-2b24
//// https://codeburst.io/vuex-and-typescript-3427ba78cfa8
//// https://polyrithm-technologies.storychief.io/vuex-with-typescript
