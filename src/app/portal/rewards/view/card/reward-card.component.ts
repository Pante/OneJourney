import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Reward } from '../../reward';


@Component({
    selector: 'app-reward-card',
    templateUrl: './reward-card.component.html',
    styleUrls: ['./reward-card.component.css']
})
export class RewardCardComponent {
    
    @Input() reward: Reward;
    @Output() details: EventEmitter<Reward>;
    
    
    constructor() {
        this.details = new EventEmitter<Reward>();
    }
    
    
    pad(value: string, maximum: number, padding: number): number {
        return value.length < maximum ? padding : 0;
    }
    
}


