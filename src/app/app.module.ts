import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthenticationModule } from './authentication/authentication.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    declarations: [
        AppComponent,
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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
