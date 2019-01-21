import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
}) 

export class PortalComponent implements OnInit {

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
