import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication-service';
import { Role } from './identity/identity';


export abstract class GuardService implements CanActivate {
    
    protected authentication: AuthenticationService;
    protected router: Router;
    
    
    constructor(authentication: AuthenticationService, router: Router) {
        this.authentication = authentication;
        this.router = router;
    }
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authenticated = this.authentication.loggedIn() && this.isIdentified() && this.validate();
        if (!authenticated) {
            this.router.navigate(['/']);
        }
        
        return authenticated;
    }
    
    protected abstract validate(): boolean;
    
    protected isIdentified(): boolean {
        return this.authentication.identity !== undefined;
    }
    
}

@Injectable({ providedIn: 'root' })
export class StaffGuardService extends GuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    protected validate(): boolean {
        return this.authentication.identity.role === Role.STAFF;
    }
    
}


@Injectable({ providedIn: 'root' })
export class StudentGuardService extends GuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    protected validate(): boolean {
        const role = this.authentication.identity.role;
        return role === Role.STUDENT || role === Role.STAFF;
    }
    
}
