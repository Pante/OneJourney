import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { authentication } from 'src/environments/authentication';


export const student = require('./student.json');

export const staff = require('./staff.json');


@Injectable({ providedIn: 'root' })
export class AuthenticationInterceptor implements HttpInterceptor {
    
    /**
    * 
    * Check whether there is response from url to obtain user info
    *  intercept and replace mock data
    * else
    *  show error
    */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe( 
            map(event => {
                if (event instanceof HttpResponse && event.url === authentication.userinfoEndpoint) {
                    return this.mock(event as HttpResponse<any>);
                    
                }  else {
                    return event;
                }
            })
        );
    }
    
    /** 
    * Check whether user is logging as demo user 1 or 2
    * if demo user 1, replace with mock data of a student
    * else demo user 2, replace with mock data of a staff
    *
    */
    mock(event: HttpResponse<any>): HttpEvent<any> {
        if (event.body.name === 'ICT-FintechDemo1 /ICT') {
            event = event.clone({ body: student });
            
        } else if (event.body.name === 'ICT-FintechDemo2 /ICT') {
            event = event.clone({ body: staff });
        }
        
        return event;
    }
    
}
