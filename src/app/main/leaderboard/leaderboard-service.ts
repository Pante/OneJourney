import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Factions } from './factions';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'src/app/rest/body';
import { AuthenticationService } from '../../authentication/authentication-service';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {

    private authentication: AuthenticationService;
    private http: HttpClient;

    constructor(authentication: AuthenticationService, http: HttpClient) {
        this.authentication = authentication;
        this.http = http;
    }

    factions(): Observable<Factions[]> {
        return this.http.get<List>(`${environment.api}/factions`).pipe(
            map(response => response.data.map(data => Factions.from(data))));
    }
}
