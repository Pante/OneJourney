import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

export const events = require('./events.json');


@Injectable({ providedIn: 'root' })
export class EventInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(`${environment.api}/activities?id=`)) {
            return of(new HttpResponse({ status: 200, body: events}));
            
        } else {
            return next.handle(request);
        } 
    }
    
}
