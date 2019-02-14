import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { GuardService } from './guard.service';
import { Role } from './identity/identity';


export abstract class RoleGuardService extends GuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    /**
     * @param route - the info of the route
     * @param state - the state of the router
     * Check whether the role of user is correct and valid access token
     * if not valid, redirect user back 
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const authenticated = this.authentication.authenticated() && this.validate();
        if (!authenticated) {
            this.router.navigate(['/']);
        }
        
        return authenticated;
    }
    
    protected abstract validate(): boolean;
    
}


@Injectable({ providedIn: 'root' })
export class StaffGuardService extends RoleGuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    /**
     * Check for the role of the user is staff
     */
    protected validate(): boolean {
        return this.authentication.identity().role === Role.STAFF;
    }
    
}


@Injectable({ providedIn: 'root' })
export class StudentGuardService extends RoleGuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    /**
     * Check for the role of the user
     */
    protected validate(): boolean {
        const role = this.authentication.identity().role;
        return role === Role.STUDENT || role === Role.STAFF;
    }
    
}
