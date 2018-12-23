import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { ErrorService } from './error-service';


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit { 
    
    private service: ErrorService;
    message: string;
    details: string;
    
    
    constructor(service: ErrorService) {
        this.service = service;
        this.message = '404';
        this.details = 'This is not the page you are looking for';
    }


    ngOnInit() {
        this.service.errors().pipe(take(1)).subscribe(error => {
            this.message = error.message;
            this.details = error.details;
        });
    }

}
