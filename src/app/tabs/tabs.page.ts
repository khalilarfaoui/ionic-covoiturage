import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe((res) => {
      console.log(res);
      if (res == false) {
        this.router.navigateByUrl('auth/login');
      }
    });
  }
}
