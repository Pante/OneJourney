import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ProfileService } from '../../profile/profile.service';
import { EventService } from '../event.service';
import { EventFormComponent } from '../event-form.component';


@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
export class NewEventComponent extends EventFormComponent {
    
    constructor(router: Router, service: EventService, toast: ToastrService, loading: LoadingService, profile: ProfileService) {
        super(router, service, toast, loading, profile);
    }

    
    /**
     * when add button is clicked
     * Render loading 
     * Try to CREATE event on RESTful API
     * If able to CREATE, 
     *  finish loading, navigate back to view event and display success message
     * else unable to CREATE
     *  finish loading and display error message
     */
    create(): void {
        this.loading.render(true, 'Creating Event');
        this.service.create(this.transaction, this.file).subscribe(
            success => {
                this.loading.render(false);
                this.router.navigate(['/portal/events/view']);
                this.toast.success(`You have created a event titled "${this.transaction.title}"!`, 'Sucessfully Created Event');
            },
            error => {
                this.loading.render(false);
                this.toast.error(`Could not create "${this.transaction.title}" as an event. Please try again.`, `Failed to Create Event`);
            }
        );
    }

}
