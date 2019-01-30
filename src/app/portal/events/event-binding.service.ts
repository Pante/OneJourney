import { Injectable } from '@angular/core';

import { Event } from './event';
import { Binding } from 'src/app/shared/binding';


@Injectable({ providedIn: 'root' })
export class EventBindingService extends Binding<Event> {
    
}
