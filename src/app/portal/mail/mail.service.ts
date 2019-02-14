import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, filter, mergeAll, concatMap, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Mail, Status } from './mail';


@Injectable({ providedIn: 'root' })
export class MailService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    private toaster: ToastrService;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient, toaster: ToastrService) {
        this.authentication = authentication;
        this.http = http;
        this.toaster = toaster;
    }
    
    
    /**
     * Show new mail on side
     */
    toast(mails: Observable<Mail> = this.getFlat()): void {
        mails.pipe(filter(mail => mail.status === Status.NEW), concatMap(mail => of(mail).pipe(delay(500)))).subscribe(mail =>
            this.toaster.show(mail.message, 'New Mail')
        );
    }
    
    /**
     * Change status of mail from new to read 
     * @param mail - id of mail
     * 
     * PATCH mail in RESTful API
     */
    read(mail: number): Observable<HttpResponse<Object>> {
        return this.http.patch(`${environment.api}/mail`, { id: this.authentication.identity().id, mail: mail }, {observe: 'response'}); // Proposed API
    }
    
    
    getFlat(): Observable<Mail> {
        return this.get().pipe(mergeAll());
    }
    
    /**
     * GET mail from RESTful API
     * Convert from JSON to readable data
     */
    get(): Observable<Mail[]> {
        return this.http.get<any[]>(`${environment.api}/mail?id=${this.authentication.identity().id}`).pipe(
            map(response => response.map(mail => Mail.from(mail)))
        ); // Proposed API
    }
    
}


