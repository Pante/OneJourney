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
    
    /**
     * 
     * @param file - MC image file
     * 
     * Write data onto file
     * POST image to RESTful API and get body response
     */
    upload(file: File): Observable<HttpResponse<Object>> {
        const multipart = new FormData();
        multipart.append('file', file, file.name);
        
        return this.http.post(`${environment.api}/medical_certificates`, multipart, {observe: 'response'});
    }
    
    /**
     * MC has been approved
     * @param link - url of image
     * 
     * DELETE MC image from RESTful API
     */
    approve(link: string): void {
        this.http.delete(`${environment.api}/medical_certificates?link=${link}`);
    }
    
    /**
     * GET image from RESTful API
     */
    get(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.api}/medical_certificates`);
    }
    
}

