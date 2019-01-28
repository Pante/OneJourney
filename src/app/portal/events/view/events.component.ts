import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/alert/toast.service';
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
export class EventsComponent implements OnInit, OnDestroy {
    
    private alerts: AlertService;
    private service: EventService;
    private subscription: Subscription;
    authentication: AuthenticationService;
    events: Paginated<Event>;
    selected?: Event;
    
    
    constructor(alerts: AlertService, service: EventService, authentication: AuthenticationService, device: DeviceDetectorService, title: Title) {
        this.alerts = alerts;
        this.service = service;
        this.authentication = authentication;
        this.events = Paginated.of<Event>(device);
        title.setTitle('OneJourney - Events');
    }

    ngOnInit() {
        this.subscription = this.service.events().subscribe(events => {
            this.events.load(events, 1, this.authentication.identity().role === Role.STAFF ? 1 : 0);
        });
    }
  
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    
    details(event: Event) {
        this.selected = event;
    }
    
    
    enrol() {
        this.service.enrol(this.selected).subscribe(success => {
            if (success) {
//                this.alerts.push('Events Notifiaction', `You have been enrolled in '${this.selected.title}'.`, 'alert-success');
                
            } else {
//                this.alerts.push('Events Notification', `Unable to enrol you in '${this.selected.title}'. Please try again.`, 'alert-danger');
            }
        });
    }
    
    unenrol() {
        this.service.unenrol(this.selected).subscribe(success => {
            if (success) {
//                this.alerts.push(`You have been unenrolled from '${this.selected.title}'.`, 'alert-success');
                
            } else {
//                this.alerts.push(`Unable to unerol you from '${this.selected.title}'.`, 'alert-danger');
            }
        });
    }

}
