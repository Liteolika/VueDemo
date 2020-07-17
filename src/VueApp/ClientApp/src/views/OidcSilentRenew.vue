<template>
    <h1>Wait..</h1>
</template>

<script lang="ts">
    import authService from "../services/auth";

    export default {
        name: "about",
        mounted() {
            authService.userManager.signinSilentCallback()
                .then(() => {
                    console.log("vue-oidc-silent-renew-success");
                })
                .catch((err) => {
                    console.log("vue-oidc-silent-renew-error", err);
                });
        }
    }
</script>