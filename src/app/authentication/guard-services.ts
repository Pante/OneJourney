import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication-service';


export abstract class GuardService implements CanActivate {
    
    protected authentication: AuthenticationService;
    protected router: Router;
    
    
    constructor(authentication: AuthenticationService, router: Router) {
        this.authentication = authentication;
        this.router = router;
    }
    
    abstract canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
    
}


@Injectable({ providedIn: 'root' })
export class LoginGuardService extends GuardService {
    
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authentication.loggedIn()) {
            this.router.navigate(['/identity']);
        }
        
        return true;
    }
    
}


@Injectable({ providedIn: 'root' })
export class IdentityGuardService extends GuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authentication.identity) {
            this.router.navigate(['/main']);
        }
        
        return true;
    }
    
}
