import { AuthConfig } from 'angular-oauth2-oidc';


export const authentication: AuthConfig = { 
    clientId: '49c1933bb005a74fd931f790a36b12d6488f058f016a2ee626de11b46c652e01',
    redirectUri: window.location.origin + '/identity',
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh',
    skipIssuerCheck: true,
    oidc: false,
    
    loginUrl: 'https://ictpjfin.ict.np.edu.sg/oauth/authorize',
    logoutUrl: 'https://ictpjfin.ict.np.edu.sg/oauth/logout',
    tokenEndpoint: 'https://ictpjfin.ict.np.edu.sg/oauth/token',
    userinfoEndpoint: 'https://ictpjfin.ict.np.edu.sg/accounts/user_info'
};

export function profile(id?: number): string {
    return authentication.userinfoEndpoint;
}
