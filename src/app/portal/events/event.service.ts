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
    
    
    /**
     * Create a new event from RESTful API
     * 
     * @param transaction - the transaction between the user and event
     * @param file - event image
     * 
     * write event data on JSON
     * POST event from API and get body response 
     */
    create(transaction: Transaction, file: File): Observable<HttpResponse<Object>> {
        const multipart = this.multipart(Transaction.create(transaction), file);
        return this.http.post(`${environment.api}/activities`, multipart, {observe: 'response'}); // Proposed API
    }
    
    /**
     * Edit event from RESTful API
     * 
     * @param id - event id to be editted
     * @param transaction - the transaction between the user and event
     * @param file - event image
     * 
     * write event data on JSON
     * PATCH event from API and get body response 
     */
    edit(id: number, transaction: Transaction, file: File): Observable<HttpResponse<Object>> {
        const multipart = this.multipart(Transaction.edit(id, transaction), file);
        return this.http.patch(`${environment.api}/activities`, multipart, {observe: 'response'}); // Proposed API
    }
    
    /**
     * Writing data
     * 
     * @param json - the written data 
     * @param file - the event image file
     * 
     * Convert data to JSON
     * if file is defined,
     *  Set file
     */
    private multipart(json: any, file: File): FormData {
        const multipart = new FormData();
        multipart.set('activity', JSON.stringify(json)); 

        if (file !== undefined) {
            multipart.set('file', file, file.name); 
        }

        return multipart;
    }
    
    
    /**
     * Delete event from RESTful API
     * 
     * @param id - event id
     * 
     * DELETE event and get body response
     */
    delete(id: number): Observable<HttpResponse<Object>> {
        return this.http.delete(`${environment.api}/activities?id=${id}`, {observe: 'response'}); // Proposed API
    }
    
    
    /**
     * Enrol in event
     * 
     * @param event - event which is enrolled by user
     */
    signup(event: Event): Observable<HttpResponse<Object>> {
        return this.update('enrol_activity', event);
    }
    
    /**
     * Uneroll in event
     * 
     * @param event - event that will be unenrolled by user
     */
    quit(event: Event): Observable<HttpResponse<Object>> {
        return this.update('unenrol_activity', event);
    }
    
    /**
     * Edit the status of the event
     * 
     * @param path - the url for the RESTful API
     * @param event - the event
     * 
     * Update the event
     * PATCH the event and get body response
     */
    private update(path: string, event: Event): Observable<HttpResponse<Object>> {
        const body = Event.update(this.authentication.identity().id, event);
        return this.http.patch(`${environment.api}/student_transactions/${path}`, body, {observe: 'response'});
    }
    
    
    /**
     *  GET event from RESTful API
     *  convert JSON data to objects
     */
    get(): Observable<Event[]> {
        return this.http.get<List>(`${environment.api}/activities?id=${this.authentication.identity().id}`).pipe(
            map(response => response.data.map(data => Event.from(data)))
        );
    }
    
}
