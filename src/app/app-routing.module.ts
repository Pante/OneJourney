import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { IdentityComponent } from './authentication/identity/identity.component';
import { ErrorComponent } from './error/error.component';
import { PortalComponent } from './portal/portal.component';
import { EventsComponent } from './portal/events/view/events.component';
import { NewEventComponent } from './portal/events/new/new-event.component';
import { EditEventsComponent } from './portal/events/edit/edit-events.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { MCSubmissionComponent } from './portal/mc/submit/mc-submission.component';
import { ViewMCSubmissionComponent } from './portal/mc/view/view-mc-submission.component';
import { NotificationsComponent } from './portal/notifications/notifications.component';
import { ProfileComponent } from './portal/profile/profile.component';
import { RewardsComponent } from './portal/rewards/view/rewards.component';
import { NewRewardComponent } from './portal/rewards/new/new-reward.component';
import { EditRewardsComponent } from './portal/rewards/edit/edit-rewards.component';
import { BlankComponent } from './shared/blank/blank.component';

import { LoginGuardService } from './authentication/guard.service';
import { StaffGuardService, StudentGuardService } from './authentication/role-guard.service';


const routes: Routes = [
    {
        path: 'portal',
        component: PortalComponent,
        children: [
            { 
                path: 'notifications', 
                component: NotificationsComponent, 
            },
            { 
                path: 'events', 
                component: BlankComponent,
                children: [
                    { path: 'view', component: EventsComponent, canActivate: [StudentGuardService] },
                    { path: 'new', component: NewEventComponent, canActivate: [StaffGuardService] },
                    { path: 'edit', component: EditEventsComponent, canActivate: [StaffGuardService] },
                    {
                        path: '',
                        redirectTo: 'view',
                        pathMatch: 'full'
                    },
                ]
            },
            { path: 'profile', component: ProfileComponent, canActivate: [StudentGuardService] },
            { 
                path: 'mc', 
                component: BlankComponent,
                children: [
                    { path: 'view', component: ViewMCSubmissionComponent, canActivate: [StaffGuardService] },
                    { path: 'submit', component: MCSubmissionComponent, canActivate: [StudentGuardService] }
                ]
            },
            { path: 'leaderboard', component: LeaderboardComponent, canActivate: [StudentGuardService] },
            {
                path: '',
                redirectTo: 'events',
                pathMatch: 'full'
            },
            { 
                path: 'rewards', 
                component: BlankComponent, 
                children: [
                    { path: 'view', component: RewardsComponent, canActivate: [StudentGuardService] },
                    { path: 'new', component: NewRewardComponent, canActivate: [StaffGuardService] },
                    { path: 'edit', component: EditRewardsComponent, canActivate: [StaffGuardService] },
                    {
                        path: '',
                        redirectTo: 'view',
                        pathMatch: 'full'
                    },
                ]
            },
        ]
    },
    
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { path: 'identity', component: IdentityComponent },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    
    { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
