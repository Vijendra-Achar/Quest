import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginCred: FormGroup;
  isLoading: boolean = false;

  authErrorsDisplay: string;
  authErrorsDisplaySub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginCred = new FormGroup({
      emailId: new FormControl('', {
        validators: Validators.required
      }),
      password: new FormControl('', {
        validators: Validators.required
      })
    })

    this.authErrorsDisplaySub = this.authService.authErrors$.subscribe(errors => {
      this.authErrorsDisplay = errors;
    })
  }

  get emailId() {
    return this.loginCred.get('emailId');
  }

  get password() {
    return this.loginCred.get('password');
  }

  onLogin() {
    this.isLoading = true;
    this.authService.signInUser(this.emailId.value, this.password.value)
      .then(() => {
        this.router.navigate(['/']);
        this.isLoading = false;
        this.loginCred.reset();
      })
  }

  ngOnDestroy() {
    this.authErrorsDisplaySub.unsubscribe();
  }
}
