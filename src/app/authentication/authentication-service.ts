import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router/';

import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';

import { Role } from './role';


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
    async authenticate(): Promise<void> {
        if (!this.service.hasValidAccessToken()) {
            await this.service.tryLogin();
            await this.login();
            
        } else if (!this.role) {
//            const response = await this.http.get(this.service.userinfoEndpoint, JSON).toPromise();
            this.role = Role.STAFF;
            // this.role = Role.from(response); TODO enable when HTTP interceptor is complete

            // if (this.role === Role.INVALID) {
            //    this.error('Failed to retrieve user information');
            // }
        }
    }
    
    async login(): Promise<void> {
        await this.service.setupAutomaticSilentRefresh(); // Remember to include silent-refresh in build
        await this.service.initImplicitFlow();
    }
    
    
    error(message?: any): void {
        console.log(message);
        // this.router.navigate(['error']);  TODO: navigate to error page
    }
    
    
    isAuthenticated(): boolean {
        return this.service.hasValidAccessToken();
    }
    
}
