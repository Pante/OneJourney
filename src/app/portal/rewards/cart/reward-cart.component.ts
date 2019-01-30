import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Reward } from '../reward';
import { RewardService } from '../reward.service';
import { RewardCartService } from './reward-cart.service';


@Component({
    selector: 'app-reward-cart',
    templateUrl: './reward-cart.component.html',
    styleUrls: ['./reward-cart.component.css']
})
export class RewardCartComponent implements OnInit, OnDestroy {
    
    service: RewardService;
    cart: RewardCartService;
    toaster: ToastrService;
    rewards: Reward[];
    
    
    constructor(service: RewardService, cart: RewardCartService, toaster: ToastrService) {
        this.service = service;
        this.cart = cart;
        this.toaster = toaster;
    }


    ngOnInit() {
        this.cart.start();
        this.service.get().subscribe(
            rewards => rewards.filter(r => this.cart.items.has(r.id)),
            error => this.toaster.error('Could not get rewards. Please try again later.', 'Failed to Get Rewards')
        );
    }
    
    ngOnDestroy() {
        this.cart.stop();
    }

}
