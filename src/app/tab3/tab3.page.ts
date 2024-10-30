import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService : AuthService , private router : Router) {}


  logout(){
    this.authService.logout().then(()=>{
      this.router.navigateByUrl('auth')
    })
  }
  goToMessage(){
    this.router.navigateByUrl('tabs/chat')
  }

  goToMyList(){
    this.router.navigateByUrl('tabs/tab3/mes-con')
  }


}
