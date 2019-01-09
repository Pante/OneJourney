import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { AlertComponent } from './alert/alert.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './portal/events/events.component';
import { RewardsComponent } from './portal/rewards/rewards.component';
import { RewardCardComponent } from './portal/rewards/card/reward-card.component';
import { MedSubmissionComponent } from './portal/med-submission/med-submission.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { ProfileComponent } from './portal/profile/profile.component';
import { PaginationButtonsComponent } from './pagination/pagination-buttons.component';

import { EventCategoryPipe } from './portal/events/event-category.pipe';
import { ShortenPipe } from './shared/shorten.pipe';

import { AlertService } from './alert/alert.service';
import { ErrorService } from './error/error.service';
import { EventService } from './portal/events/event.service';
import { LeaderboardService } from './portal/leaderboard/leaderboard.service';
import { ProfileService } from './portal/profile/profile.service';
import { RewardService } from './portal/rewards/reward.service';
import { interceptors } from 'src/environments/interceptors';


@NgModule({
    declarations: [
        AppComponent,
        PortalComponent,
        AlertComponent,
        ErrorComponent,
        EventsComponent,
        RewardsComponent,
        RewardCardComponent,
        MedSubmissionComponent,
        LeaderboardComponent,
        ProfileComponent,
        PaginationButtonsComponent,
        
        EventCategoryPipe,
        ShortenPipe
    ],
    imports: [
        BrowserModule,
        DeviceDetectorModule.forRoot(),
        LazyLoadImageModule,
        AuthenticationModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        AlertService, ErrorService, EventService, LeaderboardService, ProfileService, RewardService, interceptors
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
