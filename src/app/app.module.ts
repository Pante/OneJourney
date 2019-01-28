import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { BlankComponent } from './shared/blank/blank.component';
import { AlertComponent } from './toast/toast.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './portal/events/view/events.component';
import { EventCardComponent } from './portal/events/view/card/event-card.component';
import { NewEventComponent } from './portal/events/new/new-event.component';
import { EditEventsComponent } from './portal/events/edit/edit-events.component';
import { RewardsComponent } from './portal/rewards/view/rewards.component';
import { RewardCardComponent } from './portal/rewards/view/card/reward-card.component';
import { NewRewardComponent } from './portal/rewards/new/new-reward.component';
import { EditRewardsComponent } from './portal/rewards/edit/edit-rewards.component';
import { MCSubmissionComponent } from './portal/mc/submit/mc-submission.component';
import { ViewMCSubmissionComponent } from './portal/mc/view/view-mc-submission.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { ProfileComponent } from './portal/profile/profile.component';
import { ElockerComponent } from './portal/elocker/elocker.component';
import { ViewLockerComponent } from './portal/elocker/view/view-locker.component';
import { AddLockerComponent } from './portal/elocker/add/add-locker.component';
import { EditLockerComponent } from './portal/elocker/edit/edit-locker.component';
import { PaginationButtonsComponent } from './pagination/pagination-buttons.component';

import { EventCategoryPipe } from './portal/events/event-category.pipe';
import { ShortenPipe } from './shared/shorten.pipe';

import { AlertService } from './toast/toast.service';
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
        BlankComponent,
        AlertComponent,
        ErrorComponent,
        EventsComponent,
        EventCardComponent,
        NewEventComponent,
        EditEventsComponent,
        RewardsComponent,
        RewardCardComponent,
        NewRewardComponent,
        EditRewardsComponent,
        MCSubmissionComponent,
        ViewMCSubmissionComponent,
        LeaderboardComponent,
        ProfileComponent,
        ElockerComponent,
        ViewLockerComponent,
        AddLockerComponent,
        EditLockerComponent,
        AddLockerComponent,
        ViewLockerComponent,
        EditLockerComponent,
        PaginationButtonsComponent,
        
        EventCategoryPipe,
        ShortenPipe
    ],
    imports: [
        BrowserModule,
        DeviceDetectorModule.forRoot(),
        AuthenticationModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        AlertService, ErrorService, EventService, LeaderboardService, ProfileService, RewardService, interceptors
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
