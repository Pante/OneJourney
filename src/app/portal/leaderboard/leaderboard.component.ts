import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { LeaderboardService } from './leaderboard.service';
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


    constructor(service: LeaderboardService, title: Title) {
        this.service = service;
        this.factions = [];
        title.setTitle('OneJourney - Leaderboard');
    }


    ngOnInit() {
        this.subscription = this.service.factions().subscribe(factions =>
            this.factions = factions.sort((a, b) => b.points - a.points)
        );
        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
}
