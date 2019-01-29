import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Role } from 'src/app/authentication/identity/identity';
import { Paginated } from '../../../pagination/paginated';
import { EventService } from '../event.service';
import { Event } from '../event';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    
    private service: EventService;
    private toaster: ToastrService;
    authentication: AuthenticationService;
    events: Paginated<Event>;
    selected?: Event;
    
    
    constructor(service: EventService, authentication: AuthenticationService, device: DeviceDetectorService, toaster: ToastrService, title: Title) {
        this.service = service;
        this.authentication = authentication;
        this.toaster = toaster;
        this.events = Paginated.of<Event>(device);
        title.setTitle('OneJourney - Events');
    }


    ngOnInit() {
        this.service.get().subscribe(events => {
            const insertions = this.authentication.identity().role === Role.STAFF ? 1 : 0;
            this.events.load(events, 1, insertions);
        });
    }
    
    
    details(event: Event) {
        this.selected = event;
    }
    
    
    signup() {
        this.service.signup(this.selected).subscribe(response => {
            this.service.get().subscribe(events => {
                this.events.load(events, this.events.page, this.events.insertions);
                this.toaster.show(response.status === 200 ? `You have signed up for "${this.selected.title}"` : `Unable to sign up for "${this.selected.title}"`, 'Event Notification');
            });
        });
    }
    
    quit() {
        this.service.quit(this.selected).subscribe(success => {
            // TODO
        });
    }

}
