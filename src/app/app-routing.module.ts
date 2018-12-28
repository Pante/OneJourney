import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
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
  {
    path: 'main',
    component: MainComponent,
    canActivate: [StudentGuardService],
    children: [
      { path: 'events', component: EventsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'medCert', component: MedSubmissionComponent },
      { path: 'leaderboard', component: LeaderboardComponent }
    ]
  },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'identity', component: IdentityComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
