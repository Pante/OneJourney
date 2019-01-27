import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class MCService {
    
    private http: HttpClient;
    
    
    constructor(http: HttpClient) {
        this.http = http;
    }
    
    
    upload(file: File): Observable<HttpResponse<Object>> {
        const multipart = new FormData();
        multipart.append('file', file, file.name);
        
        return this.http.post(`${environment.api}/medical_certificates`, multipart, {observe: 'response'});
    }
    
    approve(link: string): void {
        this.http.delete(`${environment.api}/medical_certificates?link=${link}`);
    }
    
    get(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.api}/medical_certificates`);
    }
    
}

