import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Notification } from './notification';


@Injectable({ providedIn: 'root' })
export class NotificationService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }
    
    
    read(notification: number): void {
        this.http.patch(`${environment.api}/notifications`, { id: this.authentication.identity().id, notification: notification }); // Proposed API
    }
    
    get(): Observable<Notification[]> {
        return this.http.get<any[]>(`${environment.api}/notifications?id=${this.authentication.identity().id}`).pipe(
            map(response => response.map(notification => Notification.from(notification)))
        ); // Proposed API
    }
    
}


