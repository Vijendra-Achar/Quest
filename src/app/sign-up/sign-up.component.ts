import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  signUpCred: FormGroup;
  isLoading: boolean = false;

  authErrorsDisplay: string;
  authErrorsDisplaySub: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpCred = new FormGroup({
      name: new FormControl('', {
        validators: Validators.required
      }),

      emailId: new FormControl('', {
        validators: Validators.required
      }),

      newPassword: new FormControl('', {
        validators: Validators.required
      })
    });

    this.authErrorsDisplaySub = this.authService.authErrors$.subscribe(errors => {
      this.authErrorsDisplay = errors;
    })
  }

  get name() {
    return this.signUpCred.get('name');
  }
  get emailId() {
    return this.signUpCred.get('emailId');
  }
  get newPassword() {
    return this.signUpCred.get('newPassword');
  }

  onSignUp() {
    this.isLoading = true;
    this.authService.signUpUser(this.emailId.value, this.newPassword.value, this.name.value).then(() => {
      this.router.navigate(['/']);
      this.signUpCred.reset();
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authErrorsDisplaySub.unsubscribe();
  }

}
