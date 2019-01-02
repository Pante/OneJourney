import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Factions } from './factions';
import { LeaderboardService } from './leaderboard-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Paginated } from 'src/app/shared/paginated';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit, OnDestroy {
  
  private service: LeaderboardService;
  factions: Paginated<Factions>;
  private subscription: Subscription;

  constructor(service: LeaderboardService, device: DeviceDetectorService) {
    this.service = service;
    this.factions = Paginated.of<Factions>(device);
   }

  ngOnInit() {
    this.subscription = this.service.factions().subscribe(events => this.factions.load(events));
    
    }
   
    ngOnDestroy() {
      this.subscription.unsubscribe();
    } 
}
