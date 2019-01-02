import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { authentication } from 'src/environments/authentication';
import { Role } from '../identity/identity';


export const student = {
    data: {
        id: 1,
        type: Role['STUDENT'],
        attributes: {
            name: 'ICT-FintechDemo1/ ICT'
        }
    }
};



export const staff = {
    data: {
        id: 2,
        type: Role['STAFF'],
        attributes: {
            name: 'ICT-FintechDemo2/ ICT'
        }
    }
};


@Injectable({ providedIn: 'root' })
export class AuthenticationInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe( 
            map(event => {
                if (event instanceof HttpResponse && event.url === authentication.userinfoEndpoint) {
                    return this.replace(event as HttpResponse<any>);
                    
                }  else {
                    return event;
                }
            })
        );
    }
    
    replace(event: HttpResponse<any>): HttpEvent<any> {
        if (event.body.name === 'ICT-FintechDemo1 /ICT') {
            event = event.clone({ body: staff });
            
        } else if (event.body.name === 'ICT-FintechDemo2 /ICT') {
            event = event.clone({ body: student });
        }
        
        return event;
    }
    
}