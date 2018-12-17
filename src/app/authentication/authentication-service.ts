import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OAuthService, JwksValidationHandler, OAuthEvent } from 'angular-oauth2-oidc';

import { environment } from '../../environments/environment';
    

const JSON = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


const enum Role {
    ANONYMOUS,
    STUDENT,
    STAFF,
}

function parse(role: string): Role {
    switch (role) {
        case 'student':
            return Role.STUDENT;
        case 'staffs':
            return Role.STAFF;
        default:
            return Role.ANONYMOUS;
    }
}


@Injectable()
export class AuthenticationService {
    
    private client: HttpClient;
    private service: OAuthService;
    
    
    constructor(client: HttpClient, service: OAuthService) {
        this.client = client;
        this.service = service;
        this.service.configure(environment.authentication);
        this.service.tokenValidationHandler = new JwksValidationHandler();  
    }

    
    login(): void {
        if (!this.service.hasValidAccessToken()) {
            this.service.tryLogin().then(() => {
                this.service.initImplicitFlow();
                this.service.events.subscribe(event => this.authorize(event));
            });
        }
    }   
        
    authorize(event: OAuthEvent): void  {
        // TODO
    }
    
}
