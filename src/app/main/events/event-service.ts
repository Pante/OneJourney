import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from './event';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../authentication/authentication-service';


@Injectable({ providedIn: 'root' })
export class EventService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }
    
    
    events(): Observable<Event[]> {
        return this.http.get(`${environment.api}/activities?id=${this.authentication.identity.id}`).pipe(
            map((response: any) => (response['data'] as any[]).map(data => Event.deserialize(data)))
        );
    }
    
}
