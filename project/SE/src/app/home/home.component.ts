import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle: string;
  isLoggedIn = true;
  name = '';

  constructor(private router: Router, private authService: AuthService) {
    this.pageTitle = 'Health Tracking System';
    this.authService.getUserInfo((data) => {
      this.name = data.name[0].given[0];
    }, ()=>{});
  }

  ngOnInit() {
  }

  logOutClick(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
