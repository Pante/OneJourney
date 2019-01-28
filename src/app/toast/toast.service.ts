import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';


export interface Toast {
    
    header: string;
    message: string;
    image: string;
    
}


@Injectable({ providedIn: 'root' })
export class AlertService {
    
    private emitter: Subject<Toast>;
    
    
    constructor() {
        this.emitter = new Subject<Toast>();
    }
    
    
    push(header: string, message: string, image: string): void {
        this.emitter.next({ header: header, message: message, image: image});
    }
    
    alerts(): Observable<Toast> {
        return this.emitter;
    }
    
}


