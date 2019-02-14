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
    
    
    /**
     * @param value  - the component to which needed to formatted
     * @param maximum - the maximum length of words
     * @param padding - padding of the component
     * 
     * Format the padding when length of word less than maximum length of words
     */
    pad(value: string, maximum: number, padding: number): number {
        return value.length < maximum ? padding : 0;
    }
    
}

