import Oidc, { UserManager, WebStorageStateStore, WebStorageStateStoreSettings, User, UserManagerSettings, Log } from "oidc-client";

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

const createAuthService = (): AuthService => {

    console.log("createAuthService");

    const userManagerSettings: UserManagerSettings = {
        authority: "https://localhost:5001",
        client_id: "js",
        redirect_uri: "https://localhost:44367/oidc-callback",
        response_type: "id_token token",
        scope: "openid profile api1",
        post_logout_redirect_uri: "https://localhost:44367/",
        userStore: new WebStorageStateStore({ store: window.localStorage }),
        automaticSilentRenew: true,
        silent_redirect_uri: "https://localhost:44367/oidc-silent-renew",
        accessTokenExpiringNotificationTime: 60,
        filterProtocolClaims: true,
        loadUserInfo: true
    };


    const userManager: UserManager = new UserManager(userManagerSettings);
    //let user: User;

    const getUser = (): Promise<User | null> => {
        return userManager.getUser();
    }

    const login = (): Promise<void> => {
        return userManager.signinRedirect();
    }

    const logout = (): Promise<void> => {
        userManager.clearStaleState();
        return userManager.signoutRedirect();
    }

    const getAccessToken = async (): Promise<string | null> => {
        const user: User | null = await getUser();
        return user === null ? null : user.access_token;
    }

    const isLoggedIn = async (): Promise<boolean> => {
        const user: User | null = await getUser();
        return (user !== null && !user.expired);
    }

    return {
        userManager,
        getUser,
        login,
        logout,
        getAccessToken,
        isLoggedIn

    } as AuthService;
}

const authService = createAuthService();

export default authService;

