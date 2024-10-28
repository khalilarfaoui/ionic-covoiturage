import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  err : unknown = 'Somthing went wrong'
  @ViewChild('myElement') myElementRef!: ElementRef;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().subscribe(res=>{
      console.log(res);

    })
  }
  ngOnInit(): void {
    console.log('hellos');

  }

  async login() {
    try {
      const login = await this.authService.login(this.email, this.password);
      console.log(login)
      this.router.navigateByUrl('/tabs');
    } catch (error) {
      if (error instanceof FirebaseError) {

        this.err = error.message;
      }
      console.error('Erreur de connexion :', error);
      this.myElementRef.nativeElement.click()

    }
  }
}
