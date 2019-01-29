import {Subject, Observable, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';


export class Binding<T> {
    
    private emitter: BehaviorSubject<T>;
    
    
    constructor() {
        this.emitter = new BehaviorSubject<T>(null);
    }
    
    
    push(value: T): void {
        this.emitter.next(value);

    }
    
    pull(): Observable<T> {
        return this.emitter;
    }
    
}

