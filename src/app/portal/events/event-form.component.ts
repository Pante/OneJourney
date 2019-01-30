import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ImagePreviewComponent } from 'src/app/shared/image-preview.component';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ProfileService } from './../profile/profile.service';
import { EventService } from './event.service';
import { Transaction } from './event-transactions';


export class EventFormComponent extends ImagePreviewComponent implements OnInit {

    router: Router;
    service: EventService;
    toast: ToastrService;
    loading: LoadingService;
    profile: ProfileService;
    categories: [string, string][]; // Requires REST API to retrieve
    transaction: Transaction;


    constructor(router: Router, service: EventService, toast: ToastrService, loading: LoadingService, profile: ProfileService) {
        super();
        this.router = router;
        this.service = service;
        this.toast = toast;
        this.loading = loading;
        this.profile = profile;
        this.categories = [['CommServe', 'Community Service'], ['Volunteer', 'Volunteer']];
        this.transaction = {
            type: 0,
            description: '',
            hours: 0,
            minimum: 0,
            awards: [],
            groups: []
        };
        this.selected = 'Choose Image';
    }

    ngOnInit() {
        this.profile.user().subscribe(profile => this.transaction.staff = profile.group.staff.id);
    }

}