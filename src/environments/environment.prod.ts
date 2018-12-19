import { AuthConfig } from 'angular-oauth2-oidc';


export const configuration: AuthConfig = { 
    clientId: '49c1933bb005a74fd931f790a36b12d6488f058f016a2ee626de11b46c652e01',
    redirectUri: window.location.origin,
    skipIssuerCheck: true,
    oidc: false,
    
    loginUrl: 'https://ictpjfin.ict.np.edu.sg/oauth/authorize',
    logoutUrl: 'https://ictpjfin.ict.np.edu.sg/oauth/logout',
    tokenEndpoint: 'https://ictpjfin.ict.np.edu.sg/oauth/token',
    userinfoEndpoint: 'https://ictpjfin.ict.np.edu.sg/accounts/user_info'
};

export const environment = {
    production: true,
    configuration: configuration,
    api: 'https://ictpjfin.ict.np.edu.sg'
};
