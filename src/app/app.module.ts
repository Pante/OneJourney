import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';

import { ErrorService } from './error/error-service';
import { interceptors } from 'src/environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        EventsComponent,
        RewardsComponent,
        MedSubmissionComponent,
        LeaderboardComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AuthenticationModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        ErrorService, interceptors
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
