import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OAuthService } from 'angular-oauth2-oidc';

import { Role } from './role';
import { environment } from '../../environments/environment';


export const JSON = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
};


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private http: HttpClient;
    private service: OAuthService;
    private role?: Role;
    
    
    constructor(http: HttpClient, service: OAuthService) {
        this.http = http;
        this.service = service;
    }

      
    /**
     * Due to Microsoft's (unsuprisingly) non-compliant OIDC implementation,
     * we have to disable automated OIDC and manually retrieve the user's role. 
     * For reference, CORS is disabled at the JWKS endpoint and thereby the 
     * user information endpoint.
     */
    async login(): Promise<void> {
        if (!this.service.hasValidAccessToken()) {
            await this.service.tryLogin();
            await this.service.initImplicitFlow();
            
        } else if (!this.role) {
            let response: any = await this.http.get(this.service.userinfoEndpoint, JSON).toPromise();
            this.role = response.data.type;
        }
    }
    
}
