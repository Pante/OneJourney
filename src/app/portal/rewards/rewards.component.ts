import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/alert/alert.service';
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
        this.subscription = this.service.rewards().subscribe(events => this.rewards.load(events));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    
    details(reward: Reward) {
        this.selected = reward;
    }
    
    confirm() {
        this.service.redeem(this.selected).subscribe(success => {
            // TODO: REFRESH PAGE FROM API
            if (success) {
                this.alerts.push(`Your redemption of ${this.selected.description} is now being processed.`, 'alert-success');
                
            } else {
                this.alerts.push(`Unable to redeem ${this.selected.description}, please try again.`, 'alert-danger');
            }
            
        });
    }

    update() {
        this.service.edit(this.selected).subscribe(success => {
            window.location.reload();
            if (success) {
                this.alerts.push(`Your redemption of ${this.selected.description} is now being processed.`, 'alert-success');
                
            } else {
                this.alerts.push(`Unable to redeem ${this.selected.description}, please try again.`, 'alert-danger');
            }
        });
    }

    create() {
        this.service.create(this.selected).subscribe(success => {
            window.location.reload();
            if (success) {
                this.alerts.push(`Your redemption of ${this.selected.description} is now being processed.`, 'alert-success');
                
            } else {
                this.alerts.push(`Unable to redeem ${this.selected.description}, please try again.`, 'alert-danger');
            }
        });
    }
}

