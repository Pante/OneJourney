import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { EventBindingService } from '../event-binding.service';
import { EventFormComponent } from '../event-form.component';
import { EventService } from '../event.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ProfileService } from '../../profile/profile.service';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent extends EventFormComponent implements OnInit, OnDestroy {
    
    private binding: EventBindingService;
    private subscription: Subscription;
    private id: number;
    
    
    constructor(router: Router, service: EventService, binding: EventBindingService, toast: ToastrService, loading: LoadingService, profile: ProfileService) {
        super(router, service, toast, loading, profile);
        this.binding = binding;
    }
    
    
    /**
     * Get user info
     * Get the event clicked 
     * If event is not loaded, show error and return user back to view event
     * Else set details of events
     */
    ngOnInit(): void {
        super.ngOnInit();
        this.subscription = this.binding.pull().subscribe(event => {
            if (event === null) { 
                this.toast.error('Something went wrong when editing your event. Please try again', 'Oops');
                this.router.navigate(['portal/events/view']);
            }
            this.id = event.id;
            this.url = event.image;
            this.transaction.title = event.title;
            this.transaction.date = moment(event.date).format(moment.HTML5_FMT.DATE);
            this.transaction.description = event.description;
            this.transaction.bytes = event.points;
            this.transaction.category = event.category.name;
        });
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    

    /**
     * Render loading of page when click edit button
     * Try to POST event to RESTful API
     * If able to POST, 
     *  finish loading, navigate back to view event and display success message
     * else unable to POST
     *  finish loading and display error message
     */
    edit(): void {
        this.loading.render(true, 'Saving Changes to Event');
        this.service.edit(this.id, this.transaction, this.file).subscribe(
            success => {
                this.loading.render(false);
                this.router.navigate(['/portal/events/view']);
                this.toast.success(`You have edited "${this.transaction.title}"`, 'Succesfully Edited Event');
            },
            error => {
                this.loading.render(false);
                this.toast.error(`Could not edit "${this.transaction.title}". Please try again.`, `Failed to Edit Event`);
            }
        );
    }

}
