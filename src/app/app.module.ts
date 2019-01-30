import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { ToastrModule } from 'ngx-toastr';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './portal/events/view/events.component';
import { EventCardComponent } from './portal/events/view/card/event-card.component';
import { NewEventComponent } from './portal/events/new/new-event.component';
import { EditEventComponent } from './portal/events/edit/edit-event.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { MailComponent } from './portal/mail/mail.component';
import { ProfileComponent } from './portal/profile/profile.component';
import { RewardsComponent } from './portal/rewards/view/rewards.component';
import { RewardCardComponent } from './portal/rewards/view/card/reward-card.component';
import { RewardCartComponent } from './portal/rewards/cart/reward-cart.component';
import { NewRewardComponent } from './portal/rewards/new/new-reward.component';
import { EditRewardComponent } from './portal/rewards/edit/edit-reward.component';
import { MCSubmissionComponent } from './portal/mc/submit/mc-submission.component';
import { ViewMCSubmissionComponent } from './portal/mc/view/view-mc-submission.component';
import { PaginationButtonsComponent } from './pagination/pagination-buttons.component';
import { BlankComponent } from './shared/blank/blank.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { StyledToastComponent } from './toast/styled-toast.component';

import { FutureDateValidatorDirective } from './shared/input/future-date.directive';
import { NumericValidatorDirective } from './shared/input/numeric.directive';

import { ShortenPipe } from './shared/shorten.pipe';

import { ErrorService } from './error/error.service';
import { EventService } from './portal/events/event.service';
import { EventBindingService } from './portal/events/event-binding.service';
import { LeaderboardService } from './portal/leaderboard/leaderboard.service';
import { MailService } from './portal/mail/mail.service';
import { MCService } from './portal/mc/mc.service';
import { ProfileService } from './portal/profile/profile.service';
import { RewardService } from './portal/rewards/reward.service';
import { RewardBindingService } from './portal/rewards/reward-binding.service';
import { LoadingService } from './shared/loading/loading.service';
import { interceptors } from 'src/environments/interceptors';



@NgModule({
    declarations: [
        AppComponent,
        PaginationButtonsComponent,
        ErrorComponent,
        PortalComponent,
        EventsComponent,
        EventCardComponent,
        NewEventComponent,
        EditEventComponent,
        LeaderboardComponent,
        MailComponent,
        MCSubmissionComponent,
        ViewMCSubmissionComponent,
        ProfileComponent,
        RewardsComponent,
        RewardCardComponent,
        RewardCartComponent,
        NewRewardComponent,
        EditRewardComponent,
        BlankComponent,
        LoadingComponent,
        StyledToastComponent,
        
        FutureDateValidatorDirective,
        NumericValidatorDirective,
        
        ShortenPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        DeviceDetectorModule.forRoot(),
        ToastrModule.forRoot({
            toastComponent: StyledToastComponent,
            toastClass: '',
            timeOut: 5000,
            preventDuplicates: true,
            positionClass: 'toast-top-right'
        }),
        AuthenticationModule.forRoot(),
        AppRoutingModule
    ],
    entryComponents: [StyledToastComponent],
    providers: [
        ErrorService, 
        EventService, 
        EventBindingService, 
        LeaderboardService, 
        MailService, 
        MCService, 
        ProfileService, 
        RewardService,
        RewardBindingService,
        LoadingService, 
        interceptors
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
