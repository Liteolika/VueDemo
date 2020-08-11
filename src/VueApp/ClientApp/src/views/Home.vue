<template>
    <div class="home">
        <h1>Vue Demo</h1>
        <div class="row">
            <div class="col-md-12">
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
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <input type="button" class="btn btn-primary" v-on:click="loadForecasts()" value="Reload" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <hr />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div v-show="!loggedIn">
                    <input type="button" class="btn btn-primary" v-on:click="login()" value="Login" />
                </div>
                <div v-show="loggedIn">
                    <input type="button" class="btn btn-primary" v-on:click="logout()" value="Logout" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <hr />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h3>Editable Grid Component</h3>
                Name: <input v-model="name1" type="text">
                <thebutton :name="name1" :initialEnthusiasm="1"></thebutton>
                Name: <input v-model="name2" type="text">
                <thebutton :name="name2" :initialEnthusiasm="2"></thebutton>
            </div>
        </div>

    </div>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { IWeatherForecast } from '../models/IWeatherForecast';
    import axios from 'axios';
    import moment from "moment";

    import authService from "../services/auth";
    import thebutton from "../components/TheButton.vue";

    @Component({
        filters: {
            capitalize: (value: string) => {
                if (!value) { return ''; }
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            },
        },
        props: [ "name1", "name2" ],
        components: {
            thebutton
        }
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