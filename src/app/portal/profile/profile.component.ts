import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { ProfileService } from './profile.service';
import { User } from './user';


export const defaultUser: User = {
    id: 0,
    type: 'students',
    studentNumber: 'student number',
    name: 'Placeholder',
    points: 0,
    bytes: 9001,
    group: {
        id: 0,
        code: '',
        faction: {
            id: 0,
            image: null,
            name: 'Faction',
            points: 0
        },
        staff: {
            id: 0,
            name: 'staff',
            email: 'email'
        }
    },
    awards: []
};


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    private service: ProfileService;
    private subscription: Subscription;

    user?: User;


    constructor(service: ProfileService, title: Title) {
        this.service = service;
        this.user = defaultUser;
        title.setTitle('OneJourney - Profile');
    }


    ngOnInit() {
        this.subscription = this.service.user().subscribe(user => this.user = user);
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
