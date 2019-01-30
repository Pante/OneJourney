import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Screen {
    
    enabled: boolean;
    title: string;
    description: string;
    
}


@Injectable({ providedIn: 'root' })
export class LoadingService {    
    
    private emitter: Subject<Screen>;
    
    
    constructor() {
        this.emitter = new Subject<Screen>();
    }
    
    
    render(enable: boolean, title: string = 'Loading', description: string = 'Please wait...'): void {
        this.emitter.next({
            enabled: enable,
            title: title,
            description: description
        });
    }
    
    
    updates(): Observable<Screen> {
        return this.emitter;
    }
    
}

