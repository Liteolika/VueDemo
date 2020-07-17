<template>
    <h1>Wait..</h1>
</template>

<script lang="ts">
    import authService from "../services/auth";

    export default {
        name: "about",
        mounted() {
            authService.userManager.signinRedirectCallback().then(function (user) {
                console.log("vue-oidc-callback-success");
                window.location.href = "../";
            }).catch(function (err) {
                console.log("vue-oidc-callback-error", err);
            });
        }
    }
</script>