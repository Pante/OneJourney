import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentGuardService } from './authentication/guard-service';


const routes: Routes = [
  { path: 'events', component: EventsComponent, canActivate: [StudentGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [StudentGuardService] },
  { path: 'rewards', component: RewardsComponent, canActivate: [StudentGuardService] },
  { path: 'medCert', component: MedSubmissionComponent, canActivate: [StudentGuardService] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [StudentGuardService] },
  { path: 'login', component: LoginComponent },
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
