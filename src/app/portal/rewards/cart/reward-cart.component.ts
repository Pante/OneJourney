import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoadingService } from 'src/app/shared/loading/loading.service';
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
    router: Router;
    loading: LoadingService;
    toaster: ToastrService;
    user: User;
    rewards: Reward[];
    
    
    constructor(service: RewardService, profile: ProfileService, cart: RewardCartService, router: Router, loading: LoadingService, toaster: ToastrService) {
        this.service = service;
        this.profile = profile;
        this.cart = cart;
        this.router = router;
        this.loading = loading;
        this.toaster = toaster;
        this.rewards = [];
    }


    /**
     * Cache id of user
     * Get reward from RESTful API
     * Check for valid and invalid rewards
     * Delete any invalid rewards
     * if error when getting reward, show error message
     * Get user from RESTful API
     * if error when getting user, show error message
     */
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
    
    
    /**
     * Decrease the amount of the selected reward
     * @param reward - selected reward
     * 
     * if less than 1, delete the reward from the card
     */
    decrease(reward: Reward): void {
        const amount = Number(this.cart.items[reward.id]) - 1;
        if (amount <= 0) {
            this.rewards = this.rewards.filter(r => r.id !== reward.id);
            delete this.cart.items[reward.id];
            
        } else {
            this.cart.items[reward.id] = amount;
        }
    }
    
    /**
     * 
     * @param reward - selected reward
     * 
     * Increase the amount of selected reward
     */
    increase(reward: Reward): void {
        const amount = Number(this.cart.items[reward.id]);
        this.cart.items[reward.id] = amount + 1;
    }
    
    
    /**
     * Calculate the total points in the cart
     */
    total(): number {
        let cost = 0;
        for (const reward of this.rewards) {
            cost += reward.points * this.cart.items[reward.id];
        }
        return cost;
    }
    
    
    redeem(): void {
        
    }
    
    /**
     * Confirm redemption of rewards
     * 
     * Redeem rewards from RESTful API
     * finish render loading
     * if success,
     *  clear cart, navigate back to viewing of reward and show success message
     * else error,
     *  show error message
     */
    confirm(): void {
        this.cart.redeem().subscribe(
            success => {
                this.loading.render(false);
                this.cart.clear();
                this.router.navigate(['/portal/rewards/view']);
                this.toaster.success(`You have redeemded your rewards`, 'Succesfully Redeemed Rewards');
            },
            error => {
                this.loading.render(false);
                this.toaster.error(`Could not redeem rewards. Please try again.`, `Failed to Redeem Rewards`);
            }
        );
    }

}
