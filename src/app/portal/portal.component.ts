import {Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

import {AuthenticationService} from '../authentication/authentication.service';

@Component({
    selector: 'app-main',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.css']
})

export class PortalComponent implements OnInit {

    authentication: AuthenticationService;
    toaster: ToastrService;
    
    constructor(authentication: AuthenticationService, toaster: ToastrService) {
        this.authentication = authentication;
        this.toaster = toaster;
    }

    ngOnInit(): void {
        setTimeout(() => this.toaster.success('Onwards to glory', 'Keep moving forward'));
        $(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });
    }

}
