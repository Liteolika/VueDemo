<template>
    <div>
        <vue-editor v-model="content" />
        <div>{{ content }}</div>
        <input type="button" v-on:click="save" value="Spara" />
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";

    import { postContent } from "../services/api";

    export default {
        components: { VueEditor },

        data: () => ({
            content: "<h1>Some initial content</h1>",
            customToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["image", "code-block"]
            ]
        }),
        methods: {
            save: function () {
                postContent(this.content)
                    .then(() => { alert("saved!") })
                    .catch((err) => console.log(err));
            }
        }
    };



</script>