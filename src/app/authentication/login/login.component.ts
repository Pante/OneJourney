import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthenticationService } from './../authentication-service';
import { AuthenticationComponent } from '../authentication-component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends AuthenticationComponent {    
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router, '/login', () => this.authentication.authenticate());
    }

}
