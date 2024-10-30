import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CovoiturageService } from 'src/app/services/covoiturage.service';

@Component({
  selector: 'app-mes-con',
  templateUrl: './mes-con.page.html',
  styleUrls: ['./mes-con.page.scss'],
})
export class MesConPage implements OnInit {

  items: any = [
  ];

  constructor(
    private covoiturageService: CovoiturageService,
    private authService : AuthService,
    private router : Router
  ) {}

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.authService.getUser().subscribe(res=>{
      console.log(res!.uid);
      this.covoiturageService.getCovoiturages().subscribe((res2) => {
        console.log(res2);
        this.items = res2;
        this.items = this.items.filter((i:any)=>{
          return i.userId == res!.uid
        })
      });
    })

  }

  goToMessage(){
    this.router.navigateByUrl('tabs/chat')
  }

  goBack(){
    this.router.navigateByUrl('tabs/tab3')
  }

  delete(id : any){
    console.log(id);
    this.covoiturageService.deleteCovoiturage(id.id)
  }

}
