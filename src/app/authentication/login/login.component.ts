import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../authentication.service';
import { AuthenticationComponent } from '../authentication.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends AuthenticationComponent {

    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router, '/login', () => this.authentication.login());
    }

}
/*this.authentication.login()*/