// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Test;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
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
                    ClientName = "VueJs JavaScript Client",
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
                        "https://localhost:44367/callback.html",
                        "https://localhost:44367/static/silent-renew.html"
                    },

                    PostLogoutRedirectUris = { "https://localhost:44367/" },
                    AllowedCorsOrigins = { "https://localhost:44367" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1"
                    },
                }
            };

        public static IEnumerable<TestUser> Testusers =>
            new TestUser[]
            {
                new TestUser
                {
                    Username = "test",
                    Password = "test",
                    SubjectId = Guid.NewGuid().ToString(),
                    ProviderSubjectId = Guid.NewGuid().ToString(),
                    Claims = new Claim[]
                    {
                        new Claim("api1", "true")
                    }
                }

            };

    }
}