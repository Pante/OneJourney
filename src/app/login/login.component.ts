import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from './../authentication/authentication-service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
    authentication: AuthenticationService;
    router: Router;
    
    
    constructor(authentication: AuthenticationService, router: Router) {
        this.authentication = authentication;
        this.router = router;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/login')) {
                this.authentication.authenticate(false);
            }
        });
    }

}
