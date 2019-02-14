import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { EventService } from '../event.service';
import { EventBindingService } from '../event-binding.service';
import { Event } from '../event';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Paginated } from '../../../pagination/paginated';
import { Role } from 'src/app/authentication/identity/identity';


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


    /**
     * Load all the events
     * 
     * GET events from RESTful API
     * check whether the user is a staff
     * if user is staff add one more card for add button
     * If unable to retrieve events, display error message
     */
    ngOnInit(): void {
        this.service.get().subscribe(
            events => {
                const insertions = this.authentication.identity().role === Role.STAFF ? 1 : 0;
                this.events.load(events, 1, insertions); 
            },
            error => this.toaster.error('Could not get events. Please try again later', 'Failed to Get Events')
        );
    }
    
    
    expand(event: Event): void {
        this.selected = event;
    }
    

    /**
     * Redirect to create new event
     */
    add() {
        this.router.navigate(['portal/events/new']);
    }
    
    
    /**
     * 
     * Get the event that was selected
     * Redirect to editting of event
     */
    edit(): void {
        this.binding.push(this.selected);
        this.router.navigate(['/portal/events/edit']);
    }
    
    
    /**
     * Delete selected event
     * 
     * Render loading
     * DELETE event from RESTful API
     * Display the success/failure message after trying to delete event
     */
    delete(): void {
        this.loading.render(true, 'Deleting Event');
        this.after(this.service.delete(this.selected.id), 
                   `You have deleted "${this.selected.title}".`, 'Successfully Deleted Event',
                   `$"{this.selected.title}" does not exist or could not be deleted. Please try again.`, 'Failed to Delete Event'
                  );
    }
    
    
    /**
     * Sign up for the selected event
     * 
     * Render loading
     * PATCH event from RESTful API
     * Display the success/failure message after trying to edit event
     */
    signup(): void {
        this.loading.render(true, 'Signing you up!');
        this.after(this.service.signup(this.selected), 
                   `You have signed up for "${this.selected.title}"`, 'Sucessful Sign up',
                   `"${this.selected.title}" does not exist or you have already signed up. Please try again.`, 'Failed to Sign Up'
                  );
    }
    
    /**
     * Quit for the selected event
     * 
     * Render loading
     * PATCH event from RESTful API
     * Display the success/failure message after trying to edit event
     */
    quit(): void {
        this.loading.render(true, `Quiting "${this.selected.title}"`);
        this.after(this.service.quit(this.selected),
                    `You have quit "${this.selected.title}"`, 'Successfully Quitted Event',
                    `"${this.selected.title}" does not exist or you have already quit. Please try again`, 'Failed to Quit Event'
                  );
    }
    
    
    /**
     * 
     * @param results - the response body for http method
     * @param successMessage - the message when http method is a success
     * @param successTitle - the title when http method is a success
     * @param failureMessage - the message when there is error for http method
     * @param failureTitle - the title when there is error for http method
     * 
     * If success, load all events and display success message
     * else if there is error, load all events and display error message
     */
    private after(results: Observable<any>, successMessage: string, successTitle: string, failureMessage: string, failureTitle: string): void {
        results.subscribe(
            success => {
                this.service.get().pipe(tap(e => this.loading.render(false))).subscribe(fetched => this.events.load(fetched));
                this.toaster.success(successMessage, successTitle);
            }, 
            error => {
                this.service.get().pipe(tap(e => this.loading.render(false))).subscribe(fetched => this.events.load(fetched));
                this.toaster.error(failureMessage, failureTitle);
            }
        );
    }

}
