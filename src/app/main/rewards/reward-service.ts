import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reward } from './reward';
import { AuthenticationService } from '../../authentication/authentication-service';
import { RESTListService } from 'src/app/shared/rest/rest-list-service';


@Injectable({ providedIn: 'root' })
export class RewardService extends RESTListService<Reward> {
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        super(authentication, http, `reward_catelogues?id=${authentication.identity.id}`);
    }
    
    protected deserialize(data: any): Reward {
        return Reward.deserialize(data);
    }
    
}

