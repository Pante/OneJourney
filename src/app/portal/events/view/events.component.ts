import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Role } from 'src/app/authentication/identity/identity';
import { Paginated } from '../../../pagination/paginated';
import { EventService } from '../event.service';
import { EventBindingService } from '../event-binding.service';
import { Event } from '../event';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    
    private router: Router;
    private service: EventService;
    private loading: LoadingService;
    private binding: EventBindingService;
    private toaster: ToastrService;
    authentication: AuthenticationService;
    events: Paginated<Event>;
    selected?: Event;
    
    
    constructor(router: Router, service: EventService, authentication: AuthenticationService, loading: LoadingService, binding: EventBindingService, toaster: ToastrService, device: DeviceDetectorService, title: Title) {
        this.router = router;
        this.service = service;
        this.authentication = authentication;
        this.loading = loading;
        this.binding = binding;
        this.toaster = toaster;
        this.events = Paginated.of<Event>(device);
        title.setTitle('OneJourney - Events');
    }


    ngOnInit(): void {
        this.service.get().subscribe(events => {
            const insertions = this.authentication.identity().role === Role.STAFF ? 1 : 0;
            this.events.load(events, 1, insertions);
        });
    }
    
    
    details(event: Event): void {
        this.selected = event;
    }
    
    
    edit(): void {
        this.binding.push(this.selected);
        this.router.navigate(['/portal/events/edit']);
    }
    
    delete(): void {
        this.loading.render(true, 'Deleting Event', 'Please Hold...');
        this.service.delete(this.selected.id).subscribe(response => {
            this.update(response, `You have deleted "${this.selected.title}"`, `Unable to delete "${this.selected.title}"`);
        });
    }
    
    
    signup(): void {
        this.loading.render(true, 'Processing', 'Please Wait...');
        this.service.signup(this.selected).subscribe(response => {
            this.update(response, `You have signed up for "${this.selected.title}"`, `Unable to sign up for "${this.selected.title}"`);
        });
    }
    
    quit(): void {
        this.service.quit(this.selected).subscribe(response => {
            this.update(response, `You have quit from "${this.selected.title}"`, `Unable to quit from "${this.selected.title}"`);
        });
    }
    
    private update(response: HttpResponse<any>, success: string, failure: string): void {
        this.service.get().subscribe(events => {
            this.events.load(events, this.events.page, this.events.insertions);
            this.toaster.show(response.status === 200 ? success : failure, 'Event Notification');
            this.loading.render(false);
        });
    }

    sig2AddEvents() {
        this.router.navigate(['portal/events/new']);
    }

}
