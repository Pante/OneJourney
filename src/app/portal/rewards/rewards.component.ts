import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Paginated } from '../../pagination/paginated';
import { RewardService } from './reward.service';
import { Reward } from './reward';


@Component({
  selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit, OnDestroy {
    
    private service: RewardService;
    private subscription: Subscription;
    
    authentication: AuthenticationService;
    rewards: Paginated<Reward>;
    selected: Reward;
    
    
    constructor(authentication: AuthenticationService, service: RewardService, device: DeviceDetectorService, title: Title) {
        this.authentication = authentication;
        this.service = service;
        this.rewards = Paginated.of<Reward>(device);
        title.setTitle('OneJourney - Rewards');
    }

    ngOnInit() {
        this.subscription = this.service.rewards().subscribe(events => this.rewards.load(events));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    
    details(reward: Reward) {
        this.selected = reward;
    }

}

