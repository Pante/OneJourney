import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './portal/events/events.component';
import { RewardsComponent } from './portal/rewards/rewards.component';
import { MedSubmissionComponent } from './portal/med-submission/med-submission.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { ProfileComponent } from './portal/profile/profile.component';

import { ErrorService } from './error/error-service';
import { EventService } from './portal/events/event-service';
import { LeaderboardService } from './portal/leaderboard/leaderboard-service';
import { ProfileService } from './portal/profile/profile-service';
import { RewardService } from './portal/rewards/reward-service';
import { interceptors } from 'src/environments/interceptors';


@NgModule({
    declarations: [
        AppComponent,
        PortalComponent,
        ErrorComponent,
        EventsComponent,
        RewardsComponent,
        MedSubmissionComponent,
        LeaderboardComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        DeviceDetectorModule.forRoot(),
        LazyLoadImageModule,
        AuthenticationModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        ErrorService, EventService, LeaderboardService, ProfileService, RewardService, interceptors
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
