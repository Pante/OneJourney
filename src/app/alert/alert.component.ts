import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AlertService, Alert } from './alert.service';



@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy { 
    
    private service: AlertService;
    private subscription: Subscription;
    alerts: Alert[];
    
    
    constructor(service: AlertService) {
        this.service = service;
        this.alerts = [];
    }


    ngOnInit() {
        this.subscription = this.service.alerts().subscribe(alert => {
            this.alerts.unshift(alert);
            setTimeout(() => this.alerts.pop(), 7500);
        });
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}


