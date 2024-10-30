import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../services/covoiturage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  filtered: any[] = [];
  searchTerm: string = '';
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
  goToMessage(){
    this.router.navigateByUrl('tabs/chat')
  }
  search(event: any) {
    console.log(event.target.value)
    const searchValue = event.target.value.toLowerCase();
    this.covoiturageService.getCovoiturages().subscribe((res) => {
      console.log(res);
      this.items = res;
      this.items = this.items.filter((i:any)=>{
        return i.allerAdresseDepart.toLowerCase().indexOf(searchValue) !== -1
      })
    });

    // this.filteredMessages = this.messages.filter((message) => {
    //   const senderName = `${message.sender.firstName} ${message.sender.lastName}`.toLowerCase();
    //   return (
    //     senderName.includes(searchValue) ||
    //     message.message.toLowerCase().includes(searchValue)
    //   );
    // });
  }

}
