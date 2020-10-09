import { User } from './services/user.model';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userName$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userName$ = this.authService.user$
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  ngOnDestroy() {
  }

}
