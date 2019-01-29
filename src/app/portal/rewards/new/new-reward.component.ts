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
        this.loading.render(true, 'Creating Event', 'Rome wasn\'t built in a day...');
        this.service.create(this.transaction, this.file).subscribe(response => {
            this.loading.render(false);
            if (response.status === 200) {
                this.router.navigate(['/portal/rewards/view']);
                this.toast.show(`You have added "${this.transaction.description}" as a reward!`, 'New Reward Notification');

            } else {
                this.toast.show(`Failed to create add "${this.transaction.description}" as a reward`, `Reward Creation Failure`);
            }
        });
    }

}
