import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../environments/environment';


const JSON = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable()
export class AuthenticationService {
    
    private http: HttpClient;
    private service: OAuthService;
    
    
    constructor(http: HttpClient, service: OAuthService) {
        this.http = http;
        this.service = service;
    }

    
    async login(): Promise<void> {
        if (!this.service.hasValidAccessToken()) {
            await this.service.tryLogin();
            await this.service.initImplicitFlow();
        }
    }
    
}
