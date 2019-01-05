import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List, Box } from '../../rest/body';
import { User } from './user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root'})
export class ProfileService {

    private http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    users(): Observable<User> {
        return this.http.get<Box>(`${environment.api}/user`).pipe(
            map(response => response.data.map(data => User.from(data)))
            );
    }
}

