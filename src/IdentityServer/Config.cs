﻿using IdentityServer4.Models;
using System.Collections.Generic;
using IdentityServer4;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<ApiResource> Apis =>
            new ApiResource[]
            {
                //new ApiResource("api1"),
                new ApiResource
                {
                    Name = "api1",
                    DisplayName = "api #1",
                    Description = "Allow the application to access API #1 on your behalf",
                    Scopes = new List<string>{ "api1" },
                    ApiSecrets = new List<Secret>() {new Secret("ScopeSecret".Sha256()) },
                    UserClaims = new List<string>{ "role", "apirclaim" }
                },
                new ApiResource("roles", "The roles", new []{ "role" }), 
            };

        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource("roles", new []{ "role" })
                //https://medium.com/@marcodesanctis2/role-based-security-with-blazor-and-identity-server-4-aba12da70049
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("api1", "My API")
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "js",
                    ClientName = "Vue Demo Client Application",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    AllowOfflineAccess = true,
                    AccessTokenLifetime = 90, // 1.5 minutes
                    AbsoluteRefreshTokenLifetime = 0,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    RequireConsent = false,

                    RedirectUris = {
                        "https://localhost:5003/oidc-callback",
                        "https://localhost:5003/oidc-silent-renew",
                        "https://localhost:5003/oidc-signout-callback"
                    },

                    PostLogoutRedirectUris = { "https://localhost:5003/oidc-signout-callback" },
                    AllowedCorsOrigins = { "https://localhost:5003" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "roles",
                        "api1"
                    },
                }
            };

    }
}