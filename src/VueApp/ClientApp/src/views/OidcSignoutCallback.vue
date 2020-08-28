<template>
    <h1>Wait..</h1>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import authService from "../services/auth";

    @Component
    export default class OidcSignoutCallback extends Vue {

        private mounted() {
            authService.userManager.signoutRedirectCallback().then(async function (user) {
                await authService.userManager.removeUser();
                await authService.userManager.clearStaleState();
                await authService.userManager.revokeAccessToken();
                console.log("vue-oidc-signout-callback-success");
                window.location.href = "../";
            }).catch(function (err) {
                console.log("vue-oidc-signout-callback-error", err);
            });
        }

    }

</script>