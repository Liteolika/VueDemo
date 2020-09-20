<template>
    <div class="home">
        <h1>{{ msg }}</h1>
        <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.</p>
        <hr />
        <input type="button" value="Get weather" @click="getWeather" />
        <input type="button" value="Login" @click="login" />
        <input type="button" value="Logout" @click="logout" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import axios from "axios";

    @Component
    export default class Home extends Vue {
        @Prop() private msg!: string;
        
        private uri: string = "/weatherforecast";

        async getWeather() {
            await axios.get(`${this.uri}`).then((res: any) => {
                console.log(res.data);
                
            });
        }

        async login() {
            const cookieResult = await axios.post("account/login", { email: "user@example.com", password: "TheSecret20!" });
            console.log(cookieResult.data);

            const tokenResult = await axios.post("account/token", { email: "user@example.com", password: "TheSecret20!" });
            console.log(tokenResult.data);
        }

        async logout() {
            const logoutResult = await axios.post("account/logout");
            console.log(logoutResult);
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
