import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { authentication } from 'src/environments/authentication';


export const student = require('./student.json');

export const staff = require('./staff.json');


@Injectable({ providedIn: 'root' })
export class AuthenticationInterceptor implements HttpInterceptor {
    
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
    
    mock(event: HttpResponse<any>): HttpEvent<any> {
        if (event.body.name === 'ICT-FintechDemo1 /ICT') {
            event = event.clone({ body: student });
            
        } else if (event.body.name === 'ICT-FintechDemo2 /ICT') {
            event = event.clone({ body: staff });
        }
        
        return event;
    }
    
}
