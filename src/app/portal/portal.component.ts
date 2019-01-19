import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { AuthenticationService } from '../authentication/authentication.service';
import { NavItemEnum } from './portalNav';

@Component({
  selector: 'app-main',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
}) 

export class PortalComponent implements OnInit {

  authentication: AuthenticationService;
  myCurrentNav = NavItemEnum.events;
  navDirectory = NavItemEnum;

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

  //Reconsidering FOR loop Implementation for sidebar items
  Active(event: string) {
    if (event == 'events') {
      this.myCurrentNav = NavItemEnum.events;
    }
    else if (event == 'profile') {
      this.myCurrentNav = NavItemEnum.profile;
    }
    else if (event == 'leaderboard') {
      this.myCurrentNav = NavItemEnum.leaderboard;
    }
    else if (event == 'medCert') {
      this.myCurrentNav = NavItemEnum.medCert;
    }
    else if (event == 'rewards') {
      this.myCurrentNav = NavItemEnum.rewards;
    }
  }

}
