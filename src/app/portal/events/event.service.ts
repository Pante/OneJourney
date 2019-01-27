import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { List } from 'src/app/rest/body';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Event } from './event';
import { Transaction } from './event-transactions';


@Injectable({ providedIn: 'root' })
export class EventService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }
    
    
    create(transaction: Transaction, file: File): Observable<HttpResponse<Object>> {
        const multipart = this.multipart(Transaction.create(transaction), file);
        return this.http.post(`${environment.api}/activities`, multipart, {observe: 'response'}); // Proposed API
    }
    
    edit(id: number, transaction: Transaction, file: File): Observable<HttpResponse<Object>> {
        const multipart = this.multipart(Transaction.edit(id, transaction), file);
        return this.http.patch(`${environment.api}/activities`, multipart, {observe: 'response'}); // Proposed API
    }
    
    private multipart(json: any, file: File): FormData {
        const multipart = new FormData();
        multipart.set('activity', JSON.stringify(json));

        if (file !== undefined) {
            multipart.set('file', file, file.name);
        }

        return multipart;
    }
    
    
    delete(id: number): Observable<HttpResponse<Object>> {
        return this.http.delete(`${environment.api}/activities?id=${id}`, {observe: 'response'}); // Proposed API
    }
    
    
    join(event: Event): Observable<HttpResponse<Object>> {
        return this.update('enrol_activity`', event);
    }
    
    leave(event: Event): Observable<HttpResponse<Object>> {
        return this.update('unenrol_activity`', event);
    }
    
    private update(path: string, event: Event): Observable<HttpResponse<Object>> {
        const body = Event.update(this.authentication.identity().id, event);
        return this.http.patch(`${environment.api}/student_transactions/${path}`, body, {observe: 'response'});
    }
    
    
    get(): Observable<Event[]> {
        return this.http.get<List>(`${environment.api}/activities?id=${this.authentication.identity().id}`).pipe(
            map(response => response.data.map(data => Event.from(data)))
        );
    }
    
}
