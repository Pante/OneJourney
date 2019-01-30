import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Redemption } from './reward-cart-transactions';


@Injectable({ providedIn: 'root' })
export class RewardCartService {
    
    private id: number;
    private http: HttpClient;
    private task: any;
    items: Map<number, number>;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.id = authentication.identity().id;
        this.http = http;
        if (this.id === localStorage['cart-id']) {
            this.items = new Map<number, number>(JSON.parse(localStorage['cart']));
            
        } else {
            this.items = new Map<number, number>();
            this.save();
        }
    }
    
    
    redeem(): Observable<HttpResponse<Object>> {
        return this.http.post(`${environment.api}/reward_transactions`, Redemption.format(this.id, this.items), {observe: 'response'});
    }
    
    
    start(): void {
        this.task = setInterval(() => this.save(), 30000);
    }
    
    stop(): void {
        if (this.task !== null) {
            clearInterval(this.task);
        }
    }
        
    
    save(): void {
        localStorage['cart-id'] = this.id;
        localStorage['cart'] = JSON.stringify(Array.from(this.items.entries()))
    }
    
    clear(): void {
        this.items.clear();
        this.save();
    }
    
}

