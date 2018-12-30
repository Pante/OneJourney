import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from './event';
import { AuthenticationService } from '../../authentication/authentication-service';
import { RESTListService } from 'src/app/shared/rest/rest-list-service';


@Injectable({ providedIn: 'root' })
export class EventService extends RESTListService<Event> {
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        super(authentication, http, `activities?id=${authentication.identity.id}`);
    }
    
    protected deserialize(data: any): Event {
        return Event.deserialize(data);
    }
    
}
