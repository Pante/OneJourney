import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { take } from 'rxjs/operators';

import { ErrorService, Message } from './error-service';
import { AuthenticationService } from '../authentication/authentication-service';


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ErrorComponent implements OnInit { 
    
    private errors: ErrorService;
    authentication: AuthenticationService;
    location: Location;
    error: Message;
    
    
    constructor(errors: ErrorService, authentication: AuthenticationService, location: Location) {
        this.errors = errors;
        this.authentication = authentication;
        this.location = location;
        this.error = {
            message: '404',
            details: 'This is not the page you are looking for.'
        };
    }


    ngOnInit() {
        this.errors.errors().pipe(take(1)).subscribe(error => this.error = error);
    }

}
