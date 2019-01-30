import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { List } from 'src/app/rest/body';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Reward } from './reward';
import { Transaction } from './reward-transactions';


@Injectable({ providedIn: 'root' })
export class RewardService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }
    
    
    create(transaction: Transaction, file: File): Observable<HttpResponse<Object>> {
        const multipart = this.multipart(Transaction.create(transaction), file);
        return this.http.post(`${environment.api}/reward_catelogues`, multipart, {observe: 'response'}); // Proposed API
    }
    
    edit(id: number, transaction: Transaction, file: File): Observable<HttpResponse<Object>> {
        const multipart = this.multipart(Transaction.edit(id, transaction), file);
        return this.http.patch(`${environment.api}/reward_catelogues`, multipart, {observe: 'response'}); // Proposed API
    }
        
    private multipart(json: any, file: File): FormData {
        const multipart = new FormData();
        multipart.set('reward', JSON.stringify(json));

        if (file !== undefined) {
            multipart.set('file', file, file.name);
        }

        return multipart;
    }
    
    
    delete(id: number): Observable<HttpResponse<Object>> {
        return this.http.delete(`${environment.api}/reward_catelogues?id=${id}`, {observe: 'response'}); // Proposed API
    }
    
    
    get(): Observable<Reward[]> {
        return this.http.get<List>(`${environment.api}/reward_catelogues?id=${this.authentication.identity().id}`).pipe(
            map(response => response.data.map(data => Reward.from(data)))
        );
    }

}

