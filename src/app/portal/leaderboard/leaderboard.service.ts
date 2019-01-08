import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { List } from 'src/app/rest/body';
import { Faction } from './faction';


@Injectable({ providedIn: 'root' })
export class LeaderboardService {

    private http: HttpClient;


    constructor(http: HttpClient) {
        this.http = http;
    }


    factions(): Observable<Faction[]> {
        return this.http.get<List>(`${environment.api}/factions`).pipe(
            map(response => response.data.map(data => Faction.from(data)))
        );
    }
    
}
