import {Subject, Observable} from 'rxjs';


export class Binding<T> {
    
    private emitter: Subject<T>;
    
    
    constructor() {
        this.emitter = new Subject<T>();
    }
    
    
    push(value: T): void {
        this.emitter.next(value);
    }
    
    pull(): Observable<T> {
        return this.emitter;
    }
    
}

