<template>
    <div class="home">
        <h1>Counter</h1>

        <p>Current count: {{ count}}</p>

        <button class="btn btn-sm btn-primary" @click="decrement">Decrement</button>
        <button class="btn btn-sm btn-secondary" @click="increment">Increment</button>
    </div>
</template>

<script lang="ts">
    //import store, { COUNTER_INCREMENT, COUNTER_DECREMENT } from "../store";
    import CountModule from "@/store/modules/count";
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Counter extends Vue {

        get count() {
            return CountModule.getCounter;
            //return store.state.counter.count;
        }

        private increment() {
            CountModule.increment();
            //store.dispatch(COUNTER_INCREMENT);
        }

        private decrement() {
            CountModule.decrement();
            //store.dispatch(COUNTER_DECREMENT);
        }

    }

</script>
