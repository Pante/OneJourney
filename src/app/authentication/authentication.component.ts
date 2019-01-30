import { OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthenticationService } from './authentication.service';


export abstract class AuthenticationComponent implements OnDestroy {
    
    authentication: AuthenticationService;
    private subscription: Subscription;
    
    
    constructor(authentication: AuthenticationService, router: Router, url: string, subscriber: (value: Event) => void) {
        this.authentication = authentication;
        this.subscription = router.events.pipe(filter(event => event instanceof NavigationEnd && event.urlAfterRedirects.includes(url))).subscribe(subscriber);
    }
    
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
