import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { IdentityComponent } from './login/identity.component';
import { ProfileComponent } from './profile/profile.component';

import { interceptors } from 'src/environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        EventsComponent,
        RewardsComponent,
        MedSubmissionComponent,
        LeaderboardComponent,
        LoginComponent,
        IdentityComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AuthenticationModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        interceptors
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
