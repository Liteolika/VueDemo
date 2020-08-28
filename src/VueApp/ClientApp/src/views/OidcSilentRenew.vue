<template>
    <h1>Wait..</h1>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import authService from "../services/auth";


    @Component
    export default class OidcSilentRenew extends Vue {

        private mounted() {
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