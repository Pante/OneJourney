import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { profile } from 'src/environments/authentication';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Box } from '../../rest/body';
import { User } from './user';


@Injectable({ providedIn: 'root'})
export class ProfileService {

    private authentication: AuthenticationService;
    private http: HttpClient;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }


    user(): Observable<User> {
        return this.http.get<Box>(`${profile(this.authentication.identity().id)}`).pipe(
            map(response => User.from(response.data))
        );
    }
    
}

