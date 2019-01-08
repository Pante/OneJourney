import { OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';


export abstract class AuthenticationComponent implements OnDestroy {
    
    authentication: AuthenticationService;
    protected router: Router;
    protected subscription: Subscription;
    
    
    constructor(authentication: AuthenticationService, router: Router, url: string, subscriber: (value: Event) => void) {
        this.authentication = authentication;
        this.router = router;
        this.subscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd && event.urlAfterRedirects.includes(url)))
                                              .subscribe(subscriber);
    }
    
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
}


