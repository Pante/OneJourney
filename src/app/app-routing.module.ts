import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'rewards', component: RewardsComponent },
  { path: 'medCert', component: MedSubmissionComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
