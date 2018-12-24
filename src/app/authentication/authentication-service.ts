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
    async authenticate(logout: boolean = false): Promise<void> {
        if (logout) {
            await this.service.logOut();
        }
        
        if (!this.service.hasValidAccessToken()) {
            try {
                await this.service.tryLogin();
                this.service.setupAutomaticSilentRefresh(); // Remember to include silent-refresh in build
                this.service.initImplicitFlow();

            } catch {
                return this.errors.report('Unable to login', 'Please try again later');
            }
            
        } else {
            this.router.navigate(['/identity']);
        }
    }

    async fetch(): Promise<void> {
        if (!this.identity) {
            try {
                this.service.tryLogin();
                const response = await this.http.get(authentication.userinfoEndpoint).toPromise();
                this.identity = Identity.from(response);

            } catch {
                return this.errors.report('Unable to retrieve user information', 'Please try to login again');
            }

        }

        this.router.navigate(['/events']);
    }
    
    
    loggedIn(): boolean {
        return this.service.hasValidAccessToken();
    }
    
}
