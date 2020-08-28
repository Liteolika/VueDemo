<template>
    <h1>Wait..</h1>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import authService from "../services/auth";

    @Component
    export default class OidcCallback extends Vue {
        private mounted() {
            authService.userManager.signinRedirectCallback().then(function (user) {
                console.log("vue-oidc-callback-success");
                window.location.href = "../";
            }).catch(function (err) {
                console.log("vue-oidc-callback-error", err);
            });
        }
    }
</script>