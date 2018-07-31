import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "jumpjump.auth0.com",
    clientID: "QIFqdhkrAdM5szdKBhWU74dcFkq5Th38",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://jumpjump.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
  }
}
