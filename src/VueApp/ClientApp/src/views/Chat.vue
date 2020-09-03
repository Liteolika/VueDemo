<template>
    <div>
        <h1>Chat</h1>
        <div>
            <input type="text" class="form-control" v-model="message" />
            <p>{{message}}</p>
            <input type="button" class="btn btn-primary" v-on:click="sendMessage" value="Send message" />
            <h3>Messages</h3>
            <ul id="example-1">
                <li v-for="(mess, index) in messages">
                    {{ mess }}
                </li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts">

    import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr"
    import { Component, Vue } from "vue-property-decorator";
    import { connect } from "tls";

    @Component
    export default class Counter extends Vue {

        constructor() {
            super();
            this.startConnection();
        }

        private connection: HubConnection = new HubConnectionBuilder()
            .withUrl("/chathub")
            .configureLogging(LogLevel.Information)
            .build();

        private startConnection() {
            this.connection.start().then(() => {
                this.connection.on("RecieveMessage", this.onMessageRecieved);
            });
            // Check how to restart/retry connection when failed.
        }

        private messages: string[] = [];
        public message: string = "Your message";

        private onMessageRecieved(user: string, message: string) {
            console.log("Recieved: ", message);
            this.messages.push(message);
        }

        private async sendMessage() {
            console.log(this.message);
            await this.connection.send("SendMessage", "da-user", this.message);
        }
    }


</script>