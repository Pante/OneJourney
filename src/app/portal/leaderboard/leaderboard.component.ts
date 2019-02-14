import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
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
    private toaster: ToastrService;
    private subscription: Subscription;

    factions: Faction[];


    constructor(service: LeaderboardService, toaster: ToastrService, title: Title) {
        this.service = service;
        this.toaster = toaster;
        this.factions = [];
        title.setTitle('OneJourney - Leaderboard');
    }

    /*
    ** Get factions from RESTFUL API when rendering page
    ** Sort faction based on highest point from desc
    ** If there is error, print message
    */
    ngOnInit() {
        this.subscription = this.service.factions().subscribe(
            factions => this.factions = factions.sort((a, b) => b.points - a.points),
            error => this.toaster.error('Failed to get factions. Please try again later.', 'Failed to Get Factions')
        );
        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
}
