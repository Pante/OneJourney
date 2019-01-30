import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ProfileService } from './../profile/profile.service';
import { EventService } from './event.service';
import { Transaction } from './event-transactions';


const defaultURL = '../../../../assets/images/profile_pic.png';


export class EventFormComponent implements OnInit {

    router: Router;
    service: EventService;
    toast: ToastrService;
    loading: LoadingService;
    profile: ProfileService;
    categories: [string, string][]; // Requires REST API to retrieve

    transaction: Transaction;
    url: any;
    file: File;
    selected: string;
    error: string;


    constructor(router: Router, service: EventService, toast: ToastrService, loading: LoadingService, profile: ProfileService) {
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
        this.url = defaultURL;
        this.selected = 'Choose Image';
    }

    ngOnInit() {
        this.profile.user().subscribe(profile => this.transaction.staff = profile.group.staff.id);
    }


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