import { Data } from './../services/data.model';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, pipe } from 'rxjs';
import { User } from '../services/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userName$: Observable<User>;
  quesPapers$: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.userName$ = this.authService.user$;
    this.quesPapers$ = this.dataService.getQuesPapers();
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  onDelete(paperid) {
    console.log(paperid);
  }

  ngOnDestroy() {
  }

}
