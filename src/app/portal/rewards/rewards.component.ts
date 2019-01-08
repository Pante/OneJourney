import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

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
    rewards: Paginated<Reward>;
    
    
    constructor(service: RewardService, device: DeviceDetectorService, title: Title) {
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

}

