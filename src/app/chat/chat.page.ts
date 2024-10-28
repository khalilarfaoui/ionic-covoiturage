import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
    console.log('Hello')
  }
  goBack(){
    //this.navCtrl.back();
    this.navCtrl.pop();

  }

}
