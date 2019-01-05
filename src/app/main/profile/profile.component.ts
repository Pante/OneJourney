import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from './profile-service';
import { User } from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private service: ProfileService;
  users: User;
  constructor(service: ProfileService) {
    this.service = service;
     }

  ngOnInit() {
    this.subscription = this.service.users().subscribe(users => this.users = users);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
