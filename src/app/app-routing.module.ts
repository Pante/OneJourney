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


const routes: Routes = [
    {
        path: 'portal',
        component: PortalComponent,
        children: [
            { path: 'events', component: EventsComponent, canActivate: [StudentGuardService] },
            { path: 'profile', component: ProfileComponent, canActivate: [StudentGuardService] },
            { path: 'rewards', component: RewardsComponent, canActivate: [StudentGuardService] },
            { path: 'medCert', component: MedSubmissionComponent, canActivate: [StudentGuardService] },
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
