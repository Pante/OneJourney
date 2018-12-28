import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router/';

import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';

import { Identity } from './identity/identity';
import { ErrorService } from '../error/error-service';
import { authentication } from 'src/environments/authentication';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private service: OAuthService;
    private errors: ErrorService;
    private router: Router;
    private http: HttpClient;
    
    identity?: Identity;


    constructor(service: OAuthService, errors: ErrorService, router: Router, http: HttpClient) {
        this.service = service;
        this.errors = errors;
        this.service.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                this.errors.report((event as OAuthErrorEvent).reason);
            }
        });
        this.router = router;
        this.http = http;
    }


    /**
     * Due to Microsoft's (unsuprisingly) non-compliant OIDC implementation,
     * we have to disable automated OIDC and manually retrieve the user's role.
     * For reference, CORS is disabled at the JWKS endpoint and thereby disables
     * the user information endpoint.
     */
    async login(): Promise<void> {
        try {
            this.service.setupAutomaticSilentRefresh(); // Remember to include silent-refresh in build
            this.service.initImplicitFlow();

        } catch {
            return this.errors.report('Unable to login', 'Well, this is embarrassing...', 'Try to login again', () => this.login());
        }
    }
    
    async logout(): Promise<void> {
        await this.service.logOut();
        await this.login();
    }
    

    async fetch(): Promise<void> {
        try {
            this.service.tryLogin();
            const response = await this.http.get(authentication.userinfoEndpoint).toPromise();
            this.identity = Identity.from(response);
            this.router.navigate(['/main']);

        } catch {
            return this.errors.report('Unable to find user', 'Do we even exist?', 'Try to login again', () => this.login());
        }
    }
    
    
    authenticated(): boolean {
        return this.service.hasValidAccessToken() && this.identity !== undefined;
    }
    
    loggedIn(): boolean {
        return this.service.hasValidAccessToken();
    }

}
