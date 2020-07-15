import Oidc, { UserManager, WebStorageStateStore, WebStorageStateStoreSettings, User, UserManagerSettings } from "oidc-client";

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

const storeSettings: WebStorageStateStoreSettings = 
{
    prefix: "oidc.",
    store: window.localStorage
};

const userManagerSettings: UserManagerSettings = {
    authority: "https://localhost:5001",
    client_id: "js",
    redirect_uri: "https://localhost:44367/callback.html",
    response_type: "id_token token",
    scope: "openid profile api1",
    post_logout_redirect_uri: "https://localhost:44367/",
    userStore: new WebStorageStateStore(storeSettings),
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://localhost:44367/silent-renew.html',
    accessTokenExpiringNotificationTime: 60,
    filterProtocolClaims: true,
    loadUserInfo: true
};

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        this.userManager = new UserManager(userManagerSettings);
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

    public async getAccessToken(): Promise<string|null> {
        const user: User | null = await this.getUser();
        return user === null ? null : user.access_token;
    }

    public async isLoggedIn(): Promise<boolean> {
        const user: User | null = await this.getUser();

        return (user !== null && !user.expired);
    }
}