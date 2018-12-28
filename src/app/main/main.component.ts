import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { AuthenticationService } from '../authentication/authentication-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
