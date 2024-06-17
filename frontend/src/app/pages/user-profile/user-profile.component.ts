import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { SecurityService } from 'src/app/services/security/security.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  theUser: User;
  subscription: Subscription;

  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    this.subscription = this.securityService.getUser().subscribe(user => {
      this.theUser = user;
    })
  }

}
