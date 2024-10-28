import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../services/covoiturage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  items: any = [
  ];

  constructor(
    private covoiturageService: CovoiturageService,
    private router : Router
  ) {}

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.covoiturageService.getCovoiturages().subscribe((res) => {
      console.log(res);
      this.items = res;
    });
  }

  selectOne(id:any){
    const url = 'tabs/tab1/item-datails/'+id
    this.router.navigateByUrl(url)
  }
}
