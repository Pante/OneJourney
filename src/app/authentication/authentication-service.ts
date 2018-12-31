import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router/';

import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';

import { authentication } from 'src/environments/authentication';
import { Box } from '../rest/body';
import { ErrorService } from '../error/error-service';
import { Identity } from './identity/identity';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private service: OAuthService;
    private errors: ErrorService;
    private router: Router;
    private http: HttpClient;
    private current?: Identity;


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
        this.current.clear();
        
        await this.login();
    }
    

    async identify(): Promise<void> {
        try {
            if (this.service.hasValidAccessToken() && (this.current = Identity.cached())) {
                this.router.navigate(['/main']);  
            }
            
            const success = await this.service.tryLogin();
            if (success) {                         
                const response = await this.http.get<Box>(authentication.userinfoEndpoint).toPromise();
                this.current = Identity.from(response.data);
                this.current.store();
                
                this.router.navigate(['/main']); 
                
            } else {
                this.router.navigate(['/login']);
            }
            
        } catch {
            return this.errors.report('Unable to find user', 'Do we even exist?', 'Try to login again', () => this.login());
        }
    }
    
    
    identity(): Identity {
        if (!this.current) {
            this.current = Identity.cached();
        }
        
        return this.current;
    }
    
    
    authenticated(): boolean {
        return this.service.hasValidAccessToken() && Identity.exists();
    }
    
    loggedIn(): boolean {
        return this.service.hasValidAccessToken();
    }

}
