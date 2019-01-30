import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoadingService, Screen } from './loading.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
}) 
export class LoadingComponent implements OnInit, OnDestroy {
    
    private service: LoadingService;
    private subscription: Subscription;
    screen: Screen;
    
    
    constructor(service: LoadingService) {
        this.service = service;
    }
    
    
    ngOnInit(): void {
        this.subscription = this.service.updates().subscribe(screen => this.screen = screen);
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
}
