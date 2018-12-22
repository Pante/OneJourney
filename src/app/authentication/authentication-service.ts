import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router/';

import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';

import { Role } from './role';
import { authentication } from 'src/environments/authentication';


export const JSON = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
};


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private service: OAuthService;
    private router: Router;
    private http: HttpClient;
    
    role?: Role;
    
    
    constructor(service: OAuthService, router: Router, http: HttpClient) {
        this.service = service;
        this.service.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                this.error((event as OAuthErrorEvent).reason);
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
    async authenticate(logout: boolean): Promise<void> {
        if (logout) {
            await this.service.logOut();
        }
        
        if (!this.service.hasValidAccessToken()) {
            try {
                await this.service.tryLogin();
                await this.service.setupAutomaticSilentRefresh(); // Remember to include silent-refresh in build
                await this.service.initImplicitFlow();

            } catch {
                this.error('Unable to login');
            }
            
        } else {
            this.router.navigate(['/identity']);
        }
    }    
    
    async identity(): Promise<void> {
        if (!this.role) {
            try {
                this.service.tryLogin();
                const response = await this.http.get(authentication.userinfoEndpoint, JSON).toPromise();
                this.role = Role.from(response);

            } catch {
                this.error('Unable to retrieve role');
            }
            
        }
        
        this.router.navigate(['/events']);
    }
    
    
    error(message?: any): void {
        console.log(message);
        // this.router.navigate(['error']);  TODO: navigate to error page
    }
    
    
    isAuthenticated(): boolean {
        return this.service.hasValidAccessToken();
    }
    
}
