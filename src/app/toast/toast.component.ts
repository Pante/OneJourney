import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AlertService, Toast } from './toast.service';



@Component({
    selector: 'app-alert',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class AlertComponent implements OnInit, OnDestroy { 
    
    private service: AlertService;
    private subscription: Subscription;
    alerts: Toast[];
    
    
    constructor(service: AlertService) {
        this.service = service;
        this.alerts = [];
    }


    ngOnInit() {
        this.subscription = this.service.alerts().subscribe(alert => {
            this.alerts.unshift(alert);
            setTimeout(() => this.alerts.pop(), 5000);
        });
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}


