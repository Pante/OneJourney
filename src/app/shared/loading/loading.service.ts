import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Screen {
    
    enable: boolean;
    title: string;
    description: string;
    
}


@Injectable({ providedIn: 'root' })
export class LoadingService {    
    
    private emitter: Subject<Screen>;
    
    
    constructor() {
        this.emitter = new Subject<Screen>();
    }
    
    
    push(enable: boolean, title: string = "Loading", description: string = "Please wait..."): void {
        this.emitter.next({
            enable: enable,
            title: title,
            description: description
        });
    }
    
    
    updates(): Observable<Screen> {
        return this.emitter;
    }
    
}

