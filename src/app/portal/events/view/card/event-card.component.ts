import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Event } from '../../event';


@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
    
    @Input() event: Event;
    @Output() details: EventEmitter<Event>;
    
    
    constructor() {
        this.details = new EventEmitter<Event>();
    }
    
}

