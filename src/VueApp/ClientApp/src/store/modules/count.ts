import { VuexModule, Module, getModule, Action, Mutation } from "vuex-module-decorators";
import store from "@/store";

@Module({
    namespaced: true,
    name: "count",
    store: store,
    dynamic: true,
    preserveState: true
})
export class CountModule extends VuexModule {

    private count: number = 12;

    @Action({ rawError: true })
    public increment() {
        this.context.commit("setCounter", 1);
    }

    @Action({ rawError: true })
    public decrement() {
        this.context.commit("setCounter", -1);
    }

    @Mutation
    public setCounter(delta: number) {
        this.count += delta;
    }

    public get getCounter(): number | null { return this.count; }
    
}
export default getModule(CountModule);
