import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RecentContact, RecentMessageService } from 'src/app/services/recent-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  userId: any;
  recentUsers:any[] = []
  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private recentService: RecentMessageService,
    private router : Router,
    private userService : UserService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.recentService.getContactsByUserId(this.userId).subscribe(res=>{
          this.recentUsers =res
          console.log(res);
          this.recentUsers.map((i:any)=>{
            const userAdvId = (i.idUsers[0] === this.userId) ? i.idUsers[1]  :i.idUsers[0]
            this.userService.getUserById(userAdvId).subscribe(res=>{
              i.usernameAdv = res?.firstName + " " + res?.lastName
              i.idAdv = res?.id
            })
          })
        })
      }
    });
  }
  goBack() {
    this.router.navigateByUrl('tabs/tab1')
  }

  openChat(userId: any) {
    this.router.navigate(['/tabs/chat/box', userId]);
  }
}
