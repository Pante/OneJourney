import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/alert/alert.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Role } from 'src/app/authentication/identity/identity';
import { Paginated } from '../../../pagination/paginated';
import { RewardService } from '../reward.service';
import { Reward } from '../reward';

@Component({
  selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit, OnDestroy {
    
    private alerts: AlertService;
    private service: RewardService;
    private subscription: Subscription;
    
    authentication: AuthenticationService;
    rewards: Paginated<Reward>;
    selected: Reward;
    
    
    constructor(alerts: AlertService, authentication: AuthenticationService, service: RewardService, device: DeviceDetectorService, title: Title) {
        this.alerts = alerts;
        this.authentication = authentication;
        this.service = service;
        this.rewards = Paginated.of<Reward>(device);
        title.setTitle('OneJourney - Rewards');
    }

    ngOnInit() {
        this.subscription = this.service.get().subscribe(events => this.rewards.load(events, 1, this.authentication.identity().role === Role.STAFF ? 1 : 0));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    
    details(reward: Reward) {
        this.selected = reward;
    }

}

