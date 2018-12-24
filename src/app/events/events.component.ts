import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from './event-service';
import { Event } from './event';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
    
    private service: EventService;
    private subscription: Subscription;
    events: Event[];
    
    
    constructor(service: EventService) {
        this.service = service;
        this.events = [];
    }

    ngOnInit() {
        this.subscription = this.service.events().subscribe(events => this.events = events);
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
