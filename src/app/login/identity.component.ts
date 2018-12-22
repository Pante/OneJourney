import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from './../authentication/authentication-service';


@Component({
    selector: 'app-identity',
    templateUrl: './identity.component.html'
})
export class IdentityComponent {
    
    authentication: AuthenticationService;
    router: Router;
    
    
    constructor(authentication: AuthenticationService, router: Router) {
        this.authentication = authentication;
        this.router = router;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/identity')) {
                this.authentication.identity();
            }
        });
    }

}
