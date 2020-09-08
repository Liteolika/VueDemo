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

    import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Counter extends Vue {

        public message: string = "Your message";

        private messages: string[] = [];

        private connection: HubConnection = new HubConnectionBuilder()
            .withUrl("/chathub")
            .configureLogging(LogLevel.Information)
            .build();

        constructor() {
            super();
            this.connection.start().then(() => {
                this.connection.on("RecieveMessage", this.onMessageRecieved);
            });
        }

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