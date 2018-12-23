import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';


export interface Message {
    
    message: any;
    details?: string;
    
}


@Injectable({ providedIn: 'root' })
export class ErrorService {
    
    private router: Router;
    private messages: Subject<Message>;
    
    
    constructor(router: Router) {
        this.router = router;
        this.messages = new Subject<Message>();
    }
    
    
    report(message: any, details?: string): void {
        this.messages.next({ message: message, details: details });
        this.router.navigate(['/error']);
    }
    
    errors(): Observable<Message> {
        return this.messages;
    }
    
}
