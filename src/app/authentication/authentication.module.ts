import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OAuthModule, ValidationHandler, JwksValidationHandler, AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';

import { AuthenticationService } from './authentication-service';
import { StaffGuardService, StudentGuardService } from './guard-service';
import { environment } from '../../environments/environment';


@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.api, environment.configuration.userinfoEndpoint],
                sendAccessToken: true
            }
        })
    ],
    exports: [
        HttpClientModule,
        OAuthModule
    ],
    providers: [
        AuthenticationService, StaffGuardService, StudentGuardService
    ]
})
export class AuthenticationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [
                {provide: AuthConfig, useValue: environment.configuration},
                {provide: ValidationHandler, useClass: JwksValidationHandler},
                {provide: OAuthStorage, useValue: localStorage},
            ]
        };
    }
}
