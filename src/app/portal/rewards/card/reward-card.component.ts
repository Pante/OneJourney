import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Reward } from '../reward';
import { AuthenticationService } from 'src/app/authentication/authentication.service';


@Component({
    selector: 'app-reward-card',
    templateUrl: './reward-card.component.html',
    styleUrls: ['./reward-card.component.css']
})
export class RewardCardComponent {
    
    service: AuthenticationService;
    
    @Input() reward: Reward;
    @Output() details: EventEmitter<Reward>;
    @Output() redemption: EventEmitter<Reward>;
    
    
    constructor(service: AuthenticationService) {
        this.service = service;
        this.details = new EventEmitter<Reward>();
        this.redemption = new EventEmitter<Reward>();
    }
    
}


