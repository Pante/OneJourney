import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class RESTInterceptor implements HttpInterceptor {
    
    private urls: Array<[string, any]>;
    
    
    constructor() {
        this.urls = new Array<[string, any]>(
            [`${environment.api}/activities?id=`, require('./mock/events.json')],
            [`${environment.api}/reward_catelogues?id=`, require('./mock/rewards.json')],
        );
    }
    
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (let entry of this.urls) {
            if (request.url.includes(entry[0])) {
                return of(new HttpResponse({ status: 200, body: entry[1]}));
            }
        }

        return next.handle(request);
    }
    
}
