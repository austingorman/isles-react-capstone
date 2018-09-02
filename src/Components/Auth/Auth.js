import history from "../../history";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        responseType: "token id_token",
        scope: "openid"
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);

            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.getCurrentUser();
                history.replace("/");
            } else if (err) {
                history.replace("/");
                console.log(err);
                alert(
                    `Error: ${
                        err.error
                    }. Check the console for further details.`
                );
            }
        });
    }

    setSession(authResult) {
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
        history.replace("/");
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("userId");
        history.replace("/");
        window.location.reload();
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            const userId = localStorage.getItem("userId");

            if (userId !== null) {
                resolve(userId);
            } else {
                const accessToken = localStorage.getItem("access_token");
                this.auth0.client.userInfo(accessToken, (err, profile) => {
                    if (profile) {
                        fetch(`http://localhost:5002/users?sub=${profile.sub}`)
                            .then(u => u.json())
                            .then(users => {
                                if (users.length) {
                                    localStorage.setItem("userId", users[0].id);
                                    resolve(users[0].id);
                                } else {
                                    fetch(`http://localhost:5002/users`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(profile)
                                    })
                                        .then(user => user.json())
                                        .then(user => {
                                            localStorage.setItem(
                                                "userId",
                                                user.id
                                            );
                                            resolve(user.id);
                                        });
                                }
                            });
                    }
                });
            }
        });
    }
}
