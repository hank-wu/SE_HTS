import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {
  username: string;
  password: string;
  patientId: number;

  editMode = false;

  userInfo = {
    name: '',
    email: '',
    gender: '',
    birthDate: ''
  }

  originUserInfo = {
    name: '',
    email: '',
    gender: '',
    birthDate: ''
  };
  pageTitle = 'Manage User Info';

  constructor(private authService: AuthService) {
    this.authService.getUserInfo((data) => {
      this.userInfo.name = data.name[0].given[0];
      this.userInfo.email = data.telecom[0].value;
      this.userInfo.gender = data.gender;
      this.userInfo.birthDate = data.birthDate;
    }, () => {});
  }

  update(): void {
    this.editMode = true;
    this.originUserInfo = JSON.parse(JSON.stringify(this.userInfo));
  }

  cancel(): void {
    this.editMode = false;
    this.userInfo = this.originUserInfo;
  }

  save(): void {
    this.editMode = false;

    const body = this.httpBody();
    this.authService.saveUserInfo(body, (data) => {
    }, () => {});
  }

  private httpBody(): string {
    interface iBody {
      [key: string]: any
    }
    const body: iBody ={
      resourceType: 'Patient',
      id: this.authService.getPatientId(),
      name: [
        {
          given: [
            this.userInfo.name
          ]
        }
      ],
      telecom: [
        {
          system: 'email',
          value: this.userInfo.email
        }
      ],
      gender: this.userInfo.gender,
      birthDate: this.userInfo.birthDate
    };
    return JSON.stringify(body);
  }

  ngOnInit() {
  }

  manageAccount(userInfoForm): void {
    this.authService.manageAccount(this.username, userInfoForm.form.value.password, (data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

}
