import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

export const rewards = require('./rewards.json');


@Injectable({ providedIn: 'root' })
export class RewardInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(`${environment.api}/reward_catelogues?id=`)) {
            return of(new HttpResponse({ status: 200, body: rewards}));
            
        } else {
            return next.handle(request);
        } 
    }
    
}
