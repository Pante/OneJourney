import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Role } from 'src/app/authentication/identity/identity';
import { Paginated } from '../../../pagination/paginated';
import { Reward } from '../reward';
import { RewardBindingService } from '../reward-binding.service';
import { RewardCartService } from '../cart/reward-cart.service';
import { RewardService } from '../reward.service';


@Component({
  selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit, OnDestroy {
    
    private router: Router;
    private service: RewardService;
    private cart: RewardCartService;
    private subscription: Subscription;
    private loading: LoadingService;
    private binding: RewardBindingService;
    private toaster: ToastrService;
    
    authentication: AuthenticationService;
    rewards: Paginated<Reward>;
    selected: Reward;
    
    
    constructor(router: Router, authentication: AuthenticationService, service: RewardService, cart: RewardCartService, loading: LoadingService, binding: RewardBindingService, toaster: ToastrService, device: DeviceDetectorService, title: Title) {
        this.router = router;
        this.authentication = authentication;
        this.service = service;
        this.cart = cart;
        this.loading = loading;
        this.binding = binding;
        this.toaster = toaster;
        this.rewards = Paginated.of<Reward>(device);
        title.setTitle('OneJourney - Rewards');
    }

    ngOnInit() {
        this.subscription = this.service.get().subscribe(
            rewards => {
                const insertions = this.authentication.identity().role === Role.STAFF ? 1 : 0;
                this.rewards.load(rewards, 1, insertions);
            },
            error => this.toaster.error('Could not get rewards. Please try again later.', 'Failed to Get Rewards')
        );
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    
    add() {
        this.router.navigate(['portal/rewards/new']);
    }
    
    details(reward: Reward): void {
        this.selected = reward;
    }
    
    
    addToCart() {
        const amount = this.cart.items.get(this.selected.id);
        this.cart.items.set(this.selected.id, amount + 1);
        this.toaster.info(`Added "${this.selected.description}" to your cart`, 'Added Item to Cart');
    }
    
    
    edit(): void {
        this.binding.push(this.selected);
        this.router.navigate(['/portal/rewards/edit']);
    }
    
    
    delete(): void {
        this.loading.render(true, 'Deleting Reward');
        this.service.delete(this.selected.id).subscribe(
            success => {
                this.service.get().pipe(tap(e => this.loading.render(false))).subscribe(fetched => this.rewards.load(fetched));
                this.toaster.success(`You have deleted "${this.selected.description}"`, `Successfully Deleted Reward`);
            },
            error => {
                this.service.get().pipe(tap(e => this.loading.render(false))).subscribe(fetched => this.rewards.load(fetched));
                this.toaster.error(`"${this.selected.description}" does not exist or could not be deleted. Please try again.`, 'Failed to Delete Reward');
            }
        );
    }

}

