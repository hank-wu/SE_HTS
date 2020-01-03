import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../log-in/auth.service";

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.css']
})
export class AccountManageComponent implements OnInit {
  username: string;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  loading = false;
  submitted = false;
  accountManageForm;

  errorMessage: string;
  
  constructor(private authService: AuthService,
              private router: Router,private formBuilder: FormBuilder) {
                this.username = authService.getUserName();
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.accountManageForm.invalid) {
        return;
    }

    this.loading = true;
    console.log(this.accountManageForm.value);
    const oldPassword = this.accountManageForm.value.oldPassword;
    const newPassword = this.accountManageForm.value.newPassword;
    const repeatNewPassword = this.accountManageForm.value.repeatNewPassword;
    if(newPassword === repeatNewPassword){
      this.authService.changePassword(this.username, oldPassword, newPassword, (data)=>{
        console.log(data);
        this.router.navigate(['/home']);
      }, (error) => {
        console.log(error);
        this.accountManageForm.value.oldPassword = '';
        this.accountManageForm.value.newPassword = '';
        this.accountManageForm.value.repeatNewPassword = '';
      })
    }
  }

  get f() { return this.accountManageForm.controls; }

  ngOnInit() {
    this.accountManageForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

}
