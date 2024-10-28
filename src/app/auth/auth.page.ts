import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  selectedSegment: string = 'login';
  currentRoute: string ='';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute)
    if(this.currentRoute.indexOf("register") != -1){
      this.selectedSegment = 'register'
    }
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
