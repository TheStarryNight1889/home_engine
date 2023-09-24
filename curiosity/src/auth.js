import { createAuth0 } from "@auth0/auth0-vue";

export const auth0 = createAuth0({
    domain: "dev-0jg8oa0k66amlc87.eu.auth0.com",
    clientId: "6q1memx0FkA1XyrJb8PnY64vCUrr3nM0",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "https://app.saer/api",
    }
});