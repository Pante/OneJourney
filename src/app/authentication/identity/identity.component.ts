import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationComponent } from '../authentication.component';
import { AuthenticationService } from '../authentication.service';


@Component({
    selector: 'app-identity',
    templateUrl: './identity.component.html',
    styleUrls: ['./identity.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IdentityComponent extends AuthenticationComponent {

    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router, '/identity', () => this.authentication.identify());
    }

}
