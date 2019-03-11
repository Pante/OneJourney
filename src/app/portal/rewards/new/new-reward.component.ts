import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { RewardService } from '../reward.service';
import { RewardFormComponent } from '../reward-form.component';


@Component({
    selector: 'app-new-reward',
    templateUrl: './new-reward.component.html',
    styleUrls: ['./new-reward.component.css']
})
export class NewRewardComponent extends RewardFormComponent {
    
    constructor(router: Router, service: RewardService, toast: ToastrService, loading: LoadingService) {
        super(router, service, toast, loading);
    }


    create(): void {
        this.loading.render(true, 'Creating Reward');
        this.service.create(this.transaction, this.file).subscribe(
            success => {
                this.loading.render(false);
                this.router.navigate(['portal/rewards/view']);
                this.toaster.success(`You have create "${this.transaction.description}"`, `Successfully Created Reward`);
            },
            error => {
                this.loading.render(false);
                this.toaster.error(`Failed to create "${this.transaction.description}" as a reward. Please try again.`, 'Failed to Create Reward');
            }
        );
    }

}
