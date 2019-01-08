import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { ProfileService } from './profile.service';
import { User } from './user';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private service: ProfileService;

    user?: User;


    constructor(service: ProfileService, title: Title) {
        this.service = service;
        title.setTitle('OneJourney - Profile');
    }


    ngOnInit() {
        this.subscription = this.service.user().subscribe(user => this.user = user);
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
