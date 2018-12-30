import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../authentication/authentication-service';


export abstract class RESTListService<T> {
    
    private authentication: AuthenticationService;
    private http: HttpClient;
    private url: string;
    
    
    constructor(authentication: AuthenticationService, http: HttpClient, url: string) {
        this.authentication = authentication;
        this.http = http;
        this.url = url;
    }
    
    
    get(): Observable<T[]> {
        return this.http.get(`${environment.api}/${this.url}`).pipe(
            map((response: any) => (response['data'] as any[]).map(data => this.deserialize(data)))
        );
    }
    
    protected abstract deserialize(data: any): T;
    
}
