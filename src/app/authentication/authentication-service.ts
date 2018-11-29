import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

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
    }

    
    initialise(): AuthenticationService {
        this.service.configure(environment.authentication);
        this.service.tokenValidationHandler = new JwksValidationHandler();
        this.service.loadDiscoveryDocumentAndLogin();
        this.service.events.subscribe(event => {
            if (event.type === 'token_received' || event.type === 'silently_refreshed') {
                this.authorize();
            }
        });
        
        return this;
    }   
        
    authorize(): void  {
        this.client.get(`${environment.api}/accounts/user_info`, JSON).subscribe((response: any) => 
            sessionStorage['role'] = parse(response.account.accountData.type)
        );
    }
    
}
