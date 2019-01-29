import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ProfileService } from '../../profile/profile.service';
import { EventService } from '../event.service';
import { EventFormComponent } from '../events-form.component';


@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
export class NewEventComponent extends EventFormComponent {
    
    constructor(router: Router, service: EventService, toast: ToastrService, loading: LoadingService, profile: ProfileService) {
        super(router, service, toast, loading, profile);
    }

    
    create(): void {
        this.loading.render(true, 'Processing Form', 'Rome wasn\'t built in a day...');
        this.service.create(this.transaction, this.file).subscribe(response => {
            this.loading.render(false);
            if (response.status === 200) {
                this.router.navigate(['/portal/events/view']);
                this.toast.show(`You have created a new event titled "${this.transaction.title}"!`, 'New Event Notification');
                
            } else {
                this.toast.show(`Failed to create an event titled "${this.transaction.title}"`, `Event Creation Failure`);
            }
        });
    }

}
