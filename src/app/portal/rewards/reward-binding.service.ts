import { Injectable } from '@angular/core';

import { Reward } from './reward';
import { Binding } from 'src/app/shared/binding';


@Injectable({ providedIn: 'root' })
export class RewardBindingService extends Binding<Reward> {
    
}

