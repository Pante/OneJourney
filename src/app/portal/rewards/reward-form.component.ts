import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { RewardService } from './reward.service';
import { Transaction } from './reward-transactions';


const defaultURL = '../../../../assets/images/profile_pic.png';


export class RewardFormComponent {

    router: Router;
    service: RewardService;
    toaster: ToastrService;
    loading: LoadingService;

    transaction: Transaction;
    url: any;
    file: File;
    selected: string;
    error: string;


    constructor(router: Router, service: RewardService, toast: ToastrService, loading: LoadingService) {
        this.router = router;
        this.service = service;
        this.toaster = toast;
        this.loading = loading;
        this.transaction = {
            description: '',
            points: 0
        };
        this.url = defaultURL;
        this.selected = 'Choose Image';
    }


    /**
     * select the event and uploading of image
     * 
     * @param event - the selected event
     * 
     * if there is no file, end process
     * Else get file
     * Check file is an image
     *  if file is an image, populate data of file
     * else show error
     */
    select(event: any): void {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        this.file = event.target.files[0];
        if (this.file.type.match(/image\/*/)) {
            this.selected = this.file.name;
            this.error = '';
            const reader = new FileReader();
            reader.onload = e => this.url = reader.result;
            reader.readAsDataURL(this.file);

        } else {
            this.selected = 'Choose Image';
            this.error = 'Only images can be uploaded.';
            this.url = defaultURL;
            this.file = null;
        }
    }

}
