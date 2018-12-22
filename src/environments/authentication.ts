import { AuthConfig } from 'angular-oauth2-oidc';


export const authentication: AuthConfig = {
    clientId: '2f5759af-53a4-42e2-a62c-f40312a3bac6',
    redirectUri: window.location.origin + '/identity',
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh',
    skipIssuerCheck: true,
    oidc: false,
    
    loginUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    logoutUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    userinfoEndpoint: 'https://graph.microsoft.com/oidc/userinfo',
};
