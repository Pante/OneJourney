import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OAuthModule, ValidationHandler, JwksValidationHandler, AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';

import { LoginComponent } from './login/login.component';
import { IdentityComponent } from './identity/identity.component';

import { AuthenticationService } from './authentication-service';
import { LoginGuardService, IdentityGuardService } from './guard-services';
import { StaffGuardService, StudentGuardService } from './role-guard-services';
import { authentication } from '../../environments/authentication';
import { environment } from '../../environments/environment';


@NgModule({
    declarations: [
        LoginComponent,
        IdentityComponent
    ],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.api, authentication.userinfoEndpoint],
                sendAccessToken: true
            }
        })
    ],
    exports: [
        HttpClientModule,
        OAuthModule
    ],
    providers: [
        AuthenticationService,
        LoginGuardService,
        IdentityGuardService, 
        StaffGuardService,
        StudentGuardService
    ]
})
export class AuthenticationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [
                {provide: AuthConfig, useValue: authentication},
                {provide: ValidationHandler, useClass: JwksValidationHandler},
                {provide: OAuthStorage, useValue: localStorage},
            ]
        };
    }
}
