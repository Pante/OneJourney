import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Redemption } from './reward-cart-transactions';


@Injectable({ providedIn: 'root' })
export class RewardCartService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    private task: any;
    items: { [key: number] : number };
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
        if (this.authentication.identity().id === localStorage['cart-id']) {
            this.items = JSON.parse(localStorage['cart']);
 
        } else {
            this.clear();
        }
    }
    
    
    redeem(): Observable<HttpResponse<Object>> {
        return this.http.post(`${environment.api}/reward_transactions`, Redemption.format(this.authentication.identity().id, this.items), {observe: 'response'});
    }

    
    total(): number {
        let all = 0;
        for (const id of Object.keys(this.items)) {
            all += Number(this.items[id]);
        }
        
        return all;
    }
    
    
    start(): void {
        this.task = setInterval(() => this.save(), 10000);
    }
    
    
    stop(): void {
        if (this.task !== null) {
            clearInterval(this.task);
        }
    }
        
    
    save(): void {
        localStorage['cart-id'] = this.authentication.identity().id;
        localStorage['cart'] = JSON.stringify(this.items);
    }
    
    clear(): void {
        this.items = {};
        this.save();
    }
    
}

