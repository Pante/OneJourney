import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { AuthenticationService } from './authentication/authentication-service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'one-journey';
    authentication: AuthenticationService;
    
    
    constructor(authentication: AuthenticationService) {
        this.authentication = authentication;
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

}
