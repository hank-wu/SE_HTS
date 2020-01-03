import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm , FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Create a new User';

  loading = false;
  submitted = false;
  registerForm;
  constructor(private authService: AuthService,
              private router: Router, private formBuilder: FormBuilder) {
  }

  cancel(): void {
    this.router.navigate(['/log-in']);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    const name = this.registerForm.value.name;
    const userName = this.registerForm.value.userName;
    const password = this.registerForm.value.password;
    this.authService.signUp(name, userName, password, (data)=>{
      this.router.navigate(['/log-in']);
    }, (error) => {
      this.registerForm.value.name = '';
      this.registerForm.value.userName = '';
      this.registerForm.value.password = '';
    })
  }

  get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

}
