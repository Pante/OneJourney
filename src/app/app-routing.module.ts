import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './main/events/events.component';
import { RewardsComponent } from './main/rewards/rewards.component';
import { MedSubmissionComponent } from './main/med-submission/med-submission.component';
import { LeaderboardComponent } from './main/leaderboard/leaderboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { IdentityComponent } from './authentication/identity/identity.component';
import { ProfileComponent } from './main/profile/profile.component';

import { LoginGuardService } from './authentication/guard-services';
import { StaffGuardService, StudentGuardService } from './authentication/role-guard-services';


const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
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
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
