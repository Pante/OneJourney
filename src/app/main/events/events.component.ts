import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

import { Paginated } from 'src/app/shared/paginated';
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
    events: Paginated<Event>;
    
    
    constructor(service: EventService, device: DeviceDetectorService) {
        this.service = service;
        this.events = Paginated.of<Event>(device);
    }

    ngOnInit() {
        this.subscription = this.service.events().subscribe(events => this.events.load(events));
    }
  
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
