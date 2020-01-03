import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  cancel(loginForm: NgForm): void {
    loginForm.reset();
  }

  signUpClick(): void{
    this.router.navigate(['/sign-up']);
  }

  login(loginForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password,(data)=>{
        this.router.navigate(['/home']);
      }, ()=>{console.log("error")});
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
