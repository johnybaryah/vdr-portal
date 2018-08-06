import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/users';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    user: User;

    constructor(
      private userService: UserService,
      private authService: AuthenticationService,
      private router: Router
    ) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.user = users[0];
        });
    }

    logout(event): void {
      event.preventDefault();
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
