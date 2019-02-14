import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';


export interface Message {
    
    message: any;
    details?: string;
    button?: string;
    action?: () => void;
    
}


@Injectable({ providedIn: 'root' })
export class ErrorService {
    
    private router: Router;
    private messages: Subject<Message>;
    
    
    constructor(router: Router) {
        this.router = router;
        this.messages = new BehaviorSubject<Message>({
            message: '404',
            details: 'This is not the page you are looking for.'
        });
    }
    
    /**
     * 
     * @param message - the error title
     * @param details - the details of the error
     * @param button - displaying of button
     * @param action - action of the button
     * Display error page
     */
    report(message: any, details?: string, button?: string, action?: () => void): void {
        this.messages.next({ message: message, details: details, button: button, action: action });
        this.router.navigate(['/error']);
    }
    
    
    errors(): Observable<Message> {
        return this.messages;
    }
    
}
