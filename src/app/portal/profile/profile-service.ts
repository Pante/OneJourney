import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { authentication } from 'src/environments/authentication';
import { Box } from '../../rest/body';
import { User } from './user';


@Injectable({ providedIn: 'root'})
export class ProfileService {

    private http: HttpClient;
    
    
    constructor(http: HttpClient) {
        this.http = http;
    }


    user(): Observable<User> {
        return this.http.get<Box>(`${authentication.userinfoEndpoint}`).pipe(
            map(response => User.from(response.data))
        );
    }
    
}

