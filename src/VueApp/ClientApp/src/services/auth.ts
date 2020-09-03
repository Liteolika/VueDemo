/* eslint-disable @typescript-eslint/camelcase */
import Oidc, { UserManager, WebStorageStateStore, User, UserManagerSettings, Log } from "oidc-client";
import authStore from "../store/modules/auth";

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

export interface AuthService {
    userManager: UserManager;
    login(): Promise<void>;
    logout(): Promise<void>;
    getUser(): Promise<User | null>;
    getAccessToken(): Promise<string | null>;
    isLoggedIn(): Promise<boolean>;
}

class AuthServiceImpl implements AuthService {

    public userManager: UserManager = new UserManager(this.getUserManagerSettings());

    constructor() {
        console.log("AuthServiceImpl:Constructor");

        this.userManager.events.addUserSignedOut(() => {
            authStore.userLoggedOut();
        });

        this.userManager.events.addUserLoaded(() => {
            authStore.userLoggedIn();
        });
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        this.userManager.clearStaleState();
        return this.userManager.signoutRedirect();
    }

    public async getAccessToken(): Promise<string | null> {
        const user: User | null = await this.getUser();
        return user === null ? null : user.access_token;
    }

    public async isLoggedIn(): Promise<boolean> {
        const user: User | null = await this.getUser();
        return (user !== null && !user.expired);
    }

    private getUserManagerSettings(): UserManagerSettings {
        return {
            authority: "https://localhost:5001",
            client_id: "js",
            redirect_uri: "https://localhost:5003/oidc-callback",
            response_type: "id_token token",
            scope: "openid profile api1",
            post_logout_redirect_uri: "https://localhost:5003/oidc-signout-callback",
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            automaticSilentRenew: true,
            silent_redirect_uri: "https://localhost:5003/oidc-silent-renew",
            accessTokenExpiringNotificationTime: 60,
            filterProtocolClaims: true,
            loadUserInfo: true
        };
    }

}

export default new AuthServiceImpl();
