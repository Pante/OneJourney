import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';


export interface Alert {
    
    message: string;
    type: string;
    
}


@Injectable({ providedIn: 'root' })
export class AlertService {
    
    private emitter: Subject<Alert>;
    
    
    constructor() {
        this.emitter = new Subject<Alert>();
    }
    
    
    push(message: string, type: string = 'alert-info'): void {
        this.emitter.next({ message: message, type: type});
    }
    
    alerts(): Observable<Alert> {
        return this.emitter;
    }
    
}


