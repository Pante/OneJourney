import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ProfileService } from '../../profile/profile.service';
import { User } from '../../profile/user';
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
    profile: ProfileService;
    cart: RewardCartService;
    toaster: ToastrService;
    user: User;
    rewards: Reward[];
    
    
    constructor(service: RewardService, profile: ProfileService, cart: RewardCartService, toaster: ToastrService) {
        this.service = service;
        this.profile = profile;
        this.cart = cart;
        this.toaster = toaster;
        this.rewards = [];
    }


    ngOnInit() {
        this.cart.start();
        this.service.get().subscribe(
            fetched => {
                const mapped = new Map<number, Reward>();
                for (const val of fetched) {
                    mapped.set(val.id, val);
                }
                
                const invalid: number[] = [];
                for (const id of Object.keys(this.cart.items)) {
                    const reward = mapped.get(Number(id));
                    if (reward) {
                        this.rewards.push(reward);
                        
                    } else {
                        invalid.push(Number(id));
                    }
                }
                
                for (const val of invalid) {
                    delete this.cart.items[val];
                }
            },
            error => this.toaster.error('Could not get rewards. Please try again later.', 'Failed to Get Rewards')
        );
        this.profile.user().subscribe(
            fetched => {
                this.user = fetched;
            },
            error => this.toaster.error('Could not get profile. Please try again later.', 'Failed to Get Profile')
        );
    }
    
    ngOnDestroy() {
        this.cart.stop();
    }
    
    
    decrease(reward: Reward): void {
        const amount = Number(this.cart.items[reward.id]) - 1;
        if (amount <= 0) {
            this.rewards = this.rewards.filter(r => r.id !== reward.id);
            delete this.cart.items[reward.id];
            
        } else {
            this.cart.items[reward.id] = amount;
        }
    }
    
    increase(reward : Reward): void {
        const amount = Number(this.cart.items[reward.id]);
        this.cart.items[reward.id] = amount + 1;
    }
    
    
    total(): number {
        let cost = 0;
        for (const reward of this.rewards) {
            cost += reward.points * this.cart.items[reward.id];
        }
        return cost;
    }
    
    
    redeem(): void {
        
    }
    
    confirm(): void {
        this.cart.redeem().subscribe(
            success => {
            
            }
        );
    }

}
