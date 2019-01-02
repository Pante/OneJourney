import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { LeaderboardService } from './leaderboard-service';
import { Faction } from './faction';


@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

    private service: LeaderboardService;
    private subscription: Subscription;

    factions: Faction[];


    constructor(service: LeaderboardService) {
        this.service = service;
        this.factions = [];
    }


    ngOnInit() {
        this.subscription = this.service.factions().subscribe(factions => this.factions = factions);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
}
