import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ToastService, Toast } from './toast.service';



@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy { 
    
    private service: ToastService;
    private subscription: Subscription;
    toasts: Toast[];
    
    
    constructor(service: ToastService) {
        this.service = service;
        this.toasts = [];
    }


    ngOnInit() {
        this.subscription = this.service.toasts().subscribe(alert => {
            
        });
    }
    
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}


