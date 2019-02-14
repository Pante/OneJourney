import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { MailService } from './mail.service';
import { Mail, Status } from './mail';


@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
    
    service: MailService;
    toaster: ToastrService;
    all: Mail[];
    unread: Mail[];
    
    
    constructor(service: MailService, toaster: ToastrService) {
        this.service = service;
        this.toaster = toaster;
        this.all = [];
        this.unread = [];
    }


    /**
     * GET mail from RESTful API
     * Sort mail by date time
     * Filter mail between unread and read
     * IF unable to get mail, show error message
     */
    ngOnInit() {
        this.service.get().subscribe(
            mails => {
                this.all = mails.sort((a, b) => b.date.getTime() - a.date.getTime());
                this.unread = mails.filter(mail => mail.status !== Status.READ).sort((a, b) => b.date.getTime() - a.date.getTime());
            },
            error => this.toaster.error('Could not get mail. Please try again later.', 'Failed to Get Mail')
        );
    }
    
    /**
     * Mark mail as read
     * @param index - id of mail
     * 
     * Change status of mail from unread to read
     * IF unable to PATCH to RESTful API, show error message
     */
    mark(index: number): void {
        const mail = this.unread.splice(index, 1)[0];
        this.service.read(mail.id).subscribe(
            success => {
                
            },
            error => this.toaster.error('Unable to mark message as read. Please try again', 'Failed to Read Mail')
        );
    }
    
    
    elapsed(mail: Mail): string {
        return moment(mail.date).fromNow();
    }

}
