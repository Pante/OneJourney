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


    ngOnInit() {
        this.service.get().subscribe(
            mails => {
                this.all = mails;
                this.unread = mails.filter(mail => mail.status !== Status.READ);
            },
            error => this.toaster.error('Could not get mail. Please try again later.', 'Failed to Get Mail')
        )
    }
    
    
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
