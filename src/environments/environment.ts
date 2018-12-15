// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { AuthConfig } from 'angular-oauth2-oidc';


export const authentication: AuthConfig = {
    issuer: "https://login.microsoftonline.com/common/v2.0/",
    clientId: '2f5759af-53a4-42e2-a62c-f40312a3bac6',
    redirectUri: window.location.origin + "/index.html",
    oidc: false,
    requestAccessToken: true,
    requireHttps: false,
    strictDiscoveryDocumentValidation: false
};

export const environment = {
    production: false,
    authentication: authentication,
    api: 'https://onejourney.karuslabs.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
