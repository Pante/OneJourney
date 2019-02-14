import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { RewardService} from '../reward.service';
import { RewardBindingService } from '../reward-binding.service';
import { RewardFormComponent } from '../reward-form.component';


@Component({
  selector: 'app-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.css']
})
export class EditRewardComponent extends RewardFormComponent implements OnInit, OnDestroy {

    private binding: RewardBindingService;
    private subscription: Subscription;
    private id: number;
    
    
    constructor(router: Router, service: RewardService, binding: RewardBindingService, toast: ToastrService, loading: LoadingService) {
        super(router, service, toast, loading);
        this.binding = binding;
    }
    
    
    /**
     * Get user info
     * Get the event clicked 
     * If event is not loaded, show error and return user back to view event
     * Else set details of events
     */
    ngOnInit(): void {
        this.subscription = this.binding.pull().subscribe(reward => {
            if (reward === null) {
                this.toaster.show('Something went wrong when editing your event. Please try again', 'Oops');
                this.router.navigate(['portal/rewards/view']);
            }
            this.id = reward.id;
            this.url = reward.image;
            this.transaction.description = reward.description;
            this.transaction.points = reward.points;
        });
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    
    /**
     * Render loading of page when click edit button
     * Try to POST reward to RESTful API
     * If able to POST, 
     *  finish loading, navigate back to view reward and display success message
     * else unable to POST
     *  finish loading and display error message
     */
    edit(): void {
        this.loading.render(true, 'Saving Changes to Reward');
        this.service.edit(this.id, this.transaction, this.file).subscribe(
            success => {
                this.router.navigate(['portal/rewards/view']);
                this.toaster.success(`You have edited "${this.transaction.description}"`, `Successfully Edited Reward`);
            },
            error => {
                this.loading.render(false);
                this.toaster.error(`Could not edit "${this.transaction.description}" as a reward. Please try again.`, 'Failed to Edit Reward');
            }
        );
    }

}
