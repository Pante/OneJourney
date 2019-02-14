import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { take } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service';
import { ErrorService, Message } from './error.service';


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ErrorComponent implements OnInit { 
    
    private title: Title;
    private errors: ErrorService;
    authentication: AuthenticationService;
    location: Location;
    error: Message;
    
    
    constructor(title: Title, errors: ErrorService, authentication: AuthenticationService, location: Location) {
        this.title = title;
        this.errors = errors;
        this.authentication = authentication;
        this.location = location;
        this.error = {
            message: '404',
            details: 'This is not the page you are looking for.'
        };
        this.title.setTitle(this.error.message);
    }


    /**
     * Emit error
     */
    ngOnInit() {
        this.errors.errors().pipe(take(1)).subscribe(error => {
            this.title.setTitle(error.message);
            this.error = error;
        });
    }

}
