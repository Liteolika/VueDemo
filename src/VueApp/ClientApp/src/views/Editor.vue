<template>
    <div>
        <vue-editor v-model="content" />
        <div>{{ content }}</div>
        <input type="button" v-on:click="save" value="Spara" />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { VueEditor } from "vue2-editor";

    import AppApi from "../services/api";
    import Component from "vue-class-component";

    import { IEditorData } from "../models";

    @Component({
        components: {
            VueEditor,
        }
    })
    export default class Editor extends Vue {

        private content: string = "<h1>Some initial content</h1>";

        private appApi = AppApi();

        public save() {

            this.appApi.postEditorContent(this.content).then((data: IEditorData) => {
                console.log(data);
            }).catch((err) => console.log(err)); 

            //postEditorContent(this.content).then((data: IEditorData) => {
            //    console.log(data);
            //}).catch((err) => console.log(err));
        }

    }

</script>