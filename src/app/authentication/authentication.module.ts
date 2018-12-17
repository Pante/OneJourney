import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthenticationService } from './authentication-service';
import { environment } from '../../environments/environment';


@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.api],
                sendAccessToken: true
            }
        })
    ],
    exports: [
        HttpClientModule,
        OAuthModule
    ],
    providers: [
        AuthenticationService
    ]
})
export class AuthenticationModule {}
