<template>
    <div class="home">
        <h1>Counter</h1>

        <p>Current count: {{ count}}</p>

        <button class="btn btn-sm btn-primary" @click="decrement">Decrement</button>
        <button class="btn btn-sm btn-secondary" @click="increment">Increment</button>
    </div>
</template>

<script lang="ts">
    import store, { COUNTER_INCREMENT, COUNTER_DECREMENT } from "../store"
    import { mapGetters, mapActions } from "vuex"

    export default {
        name: "about",
        computed: {
            count() {
                return store.state.counter.count
            }
        },
        methods: {
            increment() {
                store.dispatch(COUNTER_INCREMENT);
            },
            decrement() {
                store.dispatch(COUNTER_DECREMENT);
            }
        }
    }




</script>