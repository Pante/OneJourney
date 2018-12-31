import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { List } from 'src/app/rest/body';
import { AuthenticationService } from '../../authentication/authentication-service';
import { Event } from './event';


@Injectable({ providedIn: 'root' })
export class EventService extends RESTListService<Event> {
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        super(authentication, http, `activities?id=${authentication.identity.id}`);
    }
    
    events(): Observable<Event[]> {
        return this.http.get<List>(`${environment.api}/activities?id=`).pipe(
            map(response => response.data.map(data => Event.from(data)))
        );
    }
    
}
