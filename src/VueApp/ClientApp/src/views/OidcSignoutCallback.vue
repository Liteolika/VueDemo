<template>
    <h1>Wait..</h1>
</template>

<script lang="ts">
    import authService from "../services/auth";

    export default {
        name: "about",
        mounted() {
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