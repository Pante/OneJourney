import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal/portal.component';
import { BlankComponent } from './shared/blank/blank.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './portal/events/view/events.component';
import { AddEventsComponent } from './portal/events/add/add-events.component';
import { EditEventsComponent } from './portal/events/edit/edit-events.component';
import { RewardsComponent } from './portal/rewards/view/rewards.component';
import { AddRewardsComponent } from './portal/rewards/add/add-rewards.component';
import { EditRewardsComponent } from './portal/rewards/edit/edit-rewards.component';
import { MedSubmissionComponent } from './portal/med-submission/med-submission.component';
import { ViewMedSubmissionComponent } from './portal/med-submission/view-med-submission/view-med-submission.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { IdentityComponent } from './authentication/identity/identity.component';
import { ProfileComponent } from './portal/profile/profile.component';

import { LoginGuardService } from './authentication/guard.service';
import { StaffGuardService, StudentGuardService } from './authentication/role-guard.service';


const routes: Routes = [
    {
        path: 'portal',
        component: PortalComponent,
        children: [
            { 
                path: 'events', 
                component: BlankComponent,
                children: [
                    { path: 'view', component: EventsComponent, canActivate: [StudentGuardService] },
                    { path: 'add', component: AddEventsComponent, canActivate: [StaffGuardService] },
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
                path: 'rewards', 
                component: BlankComponent, 
                children: [
                    { path: 'view', component: RewardsComponent, canActivate: [StudentGuardService] },
                    { path: 'add', component: AddRewardsComponent, canActivate: [StaffGuardService] },
                    { path: 'edit', component: EditRewardsComponent, canActivate: [StaffGuardService] },
                    {
                        path: '',
                        redirectTo: 'view',
                        pathMatch: 'full'
                    },
                ]
            },
            { path: 'medCert', component: MedSubmissionComponent, canActivate: [StudentGuardService] },
            { path: 'view-medCert', component: ViewMedSubmissionComponent, canActivate: [StudentGuardService] },
            { path: 'leaderboard', component: LeaderboardComponent, canActivate: [StudentGuardService] },
            {
                path: '',
                redirectTo: 'events',
                pathMatch: 'full'
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
