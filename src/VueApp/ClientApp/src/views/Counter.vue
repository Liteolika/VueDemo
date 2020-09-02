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
    import CounterModule from "../store/modules/counter";
    import { mapGetters, mapActions } from "vuex";
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Counter extends Vue {

        get count() {
            return CounterModule.getCounter;
            //return store.state.counter.count;
        }

        private increment() {
            CounterModule.increment();
            //store.dispatch(COUNTER_INCREMENT);
        }

        private decrement() {
            CounterModule.decrement();
            //store.dispatch(COUNTER_DECREMENT);
        }

    }

</script>
