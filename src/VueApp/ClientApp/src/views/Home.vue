<template>
    <div class="home">
        <img alt="Vue logo" width="50" src="../assets/logo.png">
        <h1>Vue Demo</h1>
        <table class="table table-sm table-hover table-striped table-bordered" v-show="loggedIn">
            <thead>
                <tr>
                    <th v-for="(item, index) in forecastCols" v-bind:key="index">
                        {{ item.label | capitalize }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in forecasts" v-bind:key="index">
                    <td v-for="(col, index) in forecastCols" v-bind:key="index">
                        {{ col.field(item) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="button" class="btn btn-primary" v-on:click="loadForecasts()" value="Reload" />
        <div v-show="!loggedIn">
            <input type="button" class="btn btn-primary" v-on:click="login()" value="Login" />
        </div>
        <div v-show="loggedIn">
            <input type="button" class="btn btn-primary" v-on:click="logout()" value="Logout" />
        </div>
    </div>
    
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { IWeatherForecast } from '../models/IWeatherForecast';
    import axios from 'axios';
    import moment from "moment";

    import authService from "../services/auth";

    @Component({
        filters: {
            capitalize: (value: string) => {
                if (!value) { return ''; }
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            },
        },
    })
    export default class Home extends Vue {
        private forecasts: IWeatherForecast[] = [{ summary: 'No data.' } as IWeatherForecast];
        private forecastCols: any[] = [
            { name: 'Summary', label: 'Summary', field: (row: IWeatherForecast) => row.summary },
            { name: 'F', label: 'F', field: (row: IWeatherForecast) => row.temperatureF },
            { name: 'C', label: 'C', field: (row: IWeatherForecast) => row.temperatureC },
            { name: 'Date', label: 'Date', field: (row: IWeatherForecast) => row.date + " - " + moment(row.date).local().format("YYYY-MM-DD HH:mm:ss") },
        ];

        private loggedIn: boolean = false;

        public async mounted() {
            this.loadForecasts();
            authService.isLoggedIn().then((res) => {
                this.loggedIn = res;
            });
        }

        public async loadForecasts() {
            try {
                this.forecasts = (await axios.get('weatherforecast')).data;
            } catch {
                this.forecasts = [{ summary: 'No data.' } as IWeatherForecast];
            }
        };

        public async login() {
            await authService.login();
        }

        public async logout() {
            await authService.logout();
        }

    }



</script>