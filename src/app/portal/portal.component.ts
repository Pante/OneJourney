import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

import { AuthenticationService } from '../authentication/authentication.service';
import { MailService } from './mail/mail.service';
import { Status } from './mail/mail';

@Component({
    selector: 'app-main',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.css']
})

export class PortalComponent implements OnInit, OnDestroy {
    
    private subscription: Subscription;
    authentication: AuthenticationService;
    mail: MailService;
    toaster: ToastrService;
    unread: boolean;
    
    
    constructor(router: Router, authentication: AuthenticationService, mail: MailService, toaster: ToastrService) {
        this.authentication = authentication;
        this.mail = mail;
        this.toaster = toaster;
        this.subscription = router.events.pipe(filter(event => event instanceof NavigationEnd && event.urlAfterRedirects.includes('portal')))
                                        .subscribe(
                                            success => {
                                                const messages = this.mail.getFlat().pipe(tap(each => {if (each.status !== Status.READ) {
                                                    this.unread = true;
                                                }}));
                                                this.mail.toast(messages);
                                            },
                                            error => {
                                                
                                            }
                                        );
    }


    ngOnInit(): void {
        $(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });
    }
    
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
