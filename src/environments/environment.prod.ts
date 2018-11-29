import { AuthConfig } from 'angular-oauth2-oidc';


export const authentication: AuthConfig = {
    clientId: 'TBC',
    redirectUri: 'TBC',
    issuer: 'https://ictpjfin.ict.np.edu.sg/accounts/user_info',
    scope: 'TBC'
};

export const environment = {
    production: true,
    authentication: authentication,
    api: 'https://ictpjfin.ict.np.edu.sg'
};
