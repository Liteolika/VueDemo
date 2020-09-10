<template>
    <div class="home">
        <h1>Counter</h1>
        <p>Current count: {{currentCount}}</p>
        <button class="btn btn-sm btn-primary" @click="decrement">Decrement</button>
        <button class="btn btn-sm btn-secondary" @click="increment">Increment</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import * as counterStore from "@/store/modules/counter";

    @Component
    export default class Counter extends Vue {

        get currentCount() {
            return counterStore.getters.getCurrentCount;
        }

        private async increment() {
            await counterStore.actions.increment();
        }

        private async decrement() {
            await counterStore.actions.decrement();
        }

    }

</script>
