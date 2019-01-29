import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class RESTInterceptor implements HttpInterceptor {
    
    private urls: [string, any][];
    
    
    constructor() {
        this.urls = [
            [`${environment.api}/activities`, require('./mock/events.json')],
            [`${environment.api}/student_transactions`, 'success'],
            [`${environment.api}/reward_catelogues`, require('./mock/rewards.json')],
            [`${environment.api}/factions`, require('./mock/factions.json')],
            [`${environment.api}/mail`, require('./mock/mail.json')],
        ];
    }
    
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const entry of this.urls) {
            if (request.url.includes(entry[0])) {
                return of(new HttpResponse({ status: 200, body: entry[1]}));
            }
        }

        return next.handle(request);
    }
    
}
