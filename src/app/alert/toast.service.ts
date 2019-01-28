import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';


export interface Alert {
    
    header: string;
    message: string;
    image: string;
    
}


@Injectable({ providedIn: 'root' })
export class AlertService {
    
    private emitter: Subject<Alert>;
    
    
    constructor() {
        this.emitter = new Subject<Alert>();
    }
    
    
    push(header: string, message: string, image: string): void {
        this.emitter.next({ header: header, message: message, image: image});
    }
    
    alerts(): Observable<Alert> {
        return this.emitter;
    }
    
}


