import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

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
  }

}
