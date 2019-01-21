import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal/portal.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './portal/events/events.component';
import { RewardsComponent } from './portal/rewards/rewards.component';
import { MedSubmissionComponent } from './portal/med-submission/med-submission.component';
import { LeaderboardComponent } from './portal/leaderboard/leaderboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { IdentityComponent } from './authentication/identity/identity.component';
import { ProfileComponent } from './portal/profile/profile.component';

import { LoginGuardService } from './authentication/guard.service';
import { StaffGuardService, StudentGuardService } from './authentication/role-guard.service';
import { EditEventsComponent } from './portal/events/edit-events/edit-events.component';
import { AddEventsComponent } from './portal/events/add-events/add-events.component';
import { EditRewardsComponent } from './portal/rewards/edit-rewards/edit-rewards.component';
import { AddRewardsComponent } from './portal/rewards/add-rewards/add-rewards.component';
import { ViewMedSubmissionComponent } from './portal/med-submission/view-med-submission/view-med-submission.component';


const routes: Routes = [
    {
        path: 'portal',
        component: PortalComponent,
        children: [
            { path: 'events', component: EventsComponent, canActivate: [StudentGuardService] },
            //{ path: 'edit-events', component: EditEventsComponent, canActivate: [StudentGuardService] },
            //{ path: 'add-events', component: AddEventsComponent, canActivate: [StudentGuardService] },
            { path: 'profile', component: ProfileComponent, canActivate: [StudentGuardService] },
            { path: 'rewards', component: RewardsComponent, canActivate: [StudentGuardService] },
            //{ path: 'edit-rewards', component: EditRewardsComponent, canActivate: [StudentGuardService] },
            //{ path: 'add-rewards', component: AddRewardsComponent, canActivate: [StudentGuardService]  },
            { path: 'medCert', component: MedSubmissionComponent, canActivate: [StudentGuardService] },
            //{ path: 'view-medCert', component: ViewMedSubmissionComponent, canActivate: [StudentGuardService] },
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
