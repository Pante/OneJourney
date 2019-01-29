import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ProfileService } from '../../profile/profile.service';
import { EventBindingService } from '../event-binding.service';
import { EventService } from '../event.service';
import { EventFormComponent } from '../events-form.component';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent extends EventFormComponent implements OnDestroy {
    
    private binding: EventBindingService;
    private subscription: Subscription;
    private id: number;
    
    
    constructor(router: Router, service: EventService, binding: EventBindingService, toast: ToastrService, loading: LoadingService, profile: ProfileService) {
        super(router, service, toast, loading, profile);
        this.binding = binding;
    }
    
    
    ngOnInit(): void {
        super.ngOnInit();
        this.subscription = this.binding.pull().subscribe(event => {
            if (event === null) {
                this.toast.show('Something went wrong when editing your event. Please try again', 'Oops')
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
    
    
    edit(): void {
        this.loading.render(true, 'Saving Changes to Event', 'Ready Player 1');
        this.service.edit(this.id, this.transaction, this.file).subscribe(response => {
            this.loading.render(false);
            if (response.status === 200) {
                this.router.navigate(['/portal/events/view']);
                this.toast.show(`You have edited "${this.transaction.title}"!`, 'Event Notification');
                
            } else {
                this.toast.show(`Failed to edit "${this.transaction.title}"`, `Event Edition Failure`);
            }
        });
    }

}
