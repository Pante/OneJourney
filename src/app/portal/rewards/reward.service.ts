import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { List, Box } from 'src/app/rest/body';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Reward } from './reward';


@Injectable({ providedIn: 'root' })
export class RewardService {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }
    
    
    redeem(reward: Reward): Observable<boolean> {
        // TODO: POST REQUEST TO RESTFUL API
        this.http.post<Box>(`${environment.api}/reward_catelogues?id=`, reward);
        return of(true);
    }
    
    
    rewards(): Observable<Reward[]> {
        return this.http.get<List>(`${environment.api}/reward_catelogues?id=`).pipe(
            map(response => response.data.map(data => Reward.from(data)))
        );
    }
    
    edit(reward: Reward): Observable<boolean> {
        this.http.patch<Box>(`${environment.api}/reward_catelogues?id=`, reward);
        return of(true);
    }

    create(reward: Reward): Observable<boolean> {
        this.http.post<Box>(`${environment.api}/reward_catelogues`, reward);
        return of(true);
    }
}

