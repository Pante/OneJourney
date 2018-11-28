import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { RewardComponent } from './reward/reward.component';
import { MedSubmissionComponent } from './med-submission/med-submission.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'event', component: EventComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reward', component: RewardComponent },
  { path: 'medCert', component: MedSubmissionComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  {
    path: '',
    redirectTo: '/event',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
