import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Role } from 'src/app/authentication/identity/identity';
import { Paginated } from '../../../pagination/paginated';
import { RewardService } from '../reward.service';
import { RewardBindingService } from '../reward-binding.service';
import { Reward } from '../reward';


@Component({
  selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit, OnDestroy {
    
    private router: Router;
    private service: RewardService;
    private subscription: Subscription;
    private loading: LoadingService;
    private binding: RewardBindingService;
    private toaster: ToastrService;
    
    authentication: AuthenticationService;
    rewards: Paginated<Reward>;
    selected: Reward;
    
    
    constructor(router: Router, authentication: AuthenticationService, service: RewardService, loading: LoadingService, binding: RewardBindingService, toaster: ToastrService, device: DeviceDetectorService, title: Title) {
        this.router = router;
        this.authentication = authentication;
        this.service = service;
        this.loading = loading;
        this.binding = binding;
        this.toaster = toaster;
        this.rewards = Paginated.of<Reward>(device);
        title.setTitle('OneJourney - Rewards');
    }

    ngOnInit() {
        this.subscription = this.service.get().subscribe(events => this.rewards.load(events, 1, this.authentication.identity().role === Role.STAFF ? 1 : 0));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    
    details(reward: Reward): void {
        this.selected = reward;
    }
    
    
    edit(): void {
        console.log('Hi');
        this.binding.push(this.selected);
        this.router.navigate(['/portal/rewards/edit']);
    }
    
    
    delete(): void {
        this.loading.render(true, 'Deleting Reward', 'Rushing B...');
        this.service.delete(this.selected.id).subscribe(response => {
            this.service.get().subscribe(rewards => {
                this.rewards.load(rewards, this.rewards.page, this.rewards.insertions);
                this.toaster.show(response.status === 200 ? `You have deleted "${this.selected.description}"` : `Unable to delete "${this.selected.description}"`, 'Reward Notification');
                this.loading.render(false);
            });
        });
    }

    sig2AddRewards() {
        this.router.navigate(['portal/rewards/new']);
    }

}

