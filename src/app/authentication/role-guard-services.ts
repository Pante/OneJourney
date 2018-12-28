import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication-service';
import { GuardService } from './guard-services';
import { Role } from './identity/identity';


export abstract class RoleGuardService extends GuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
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
    
    
    protected validate(): boolean {
        return this.authentication.identity.role === Role.STAFF;
    }
    
}


@Injectable({ providedIn: 'root' })
export class StudentGuardService extends RoleGuardService {
    
    constructor(authentication: AuthenticationService, router: Router) {
        super(authentication, router);
    }
    
    
    protected validate(): boolean {
        const role = this.authentication.identity.role;
        return role === Role.STUDENT || role === Role.STAFF;
    }
    
}