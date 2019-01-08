import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { List } from 'src/app/rest/body';
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
    
    
    rewards(): Observable<Reward[]> {
        return this.http.get<List>(`${environment.api}/reward_catelogues?id=`).pipe(
            map(response => response.data.map(data => Reward.from(data)))
        );
    }
    
}

