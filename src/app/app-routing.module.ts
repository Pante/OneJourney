import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { IdentityComponent } from './authentication/identity/identity.component';
import { ProfileComponent } from './profile/profile.component';
import { StaffGuardService, StudentGuardService } from './authentication/guard-service';


const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: 'events', component: EventsComponent, canActivate: [StudentGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [StudentGuardService] },
  { path: 'rewards', component: RewardsComponent, canActivate: [StudentGuardService] },
  { path: 'medCert', component: MedSubmissionComponent, canActivate: [StudentGuardService] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [StudentGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'identity', component: IdentityComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
