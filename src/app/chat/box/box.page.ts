import firebase from 'firebase/compat/app';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { User, UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RecentContact,
  RecentMessageService,
} from 'src/app/services/recent-message.service';
@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss'],
})
export class BoxPage implements OnInit, AfterViewChecked {
  messages: Chat[] = [];
  currentMessage: string = '';
  userId: any;
  id: any;
  userObj: User = {} as User;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  constructor(
    private authService: AuthService,
    private recentService: RecentMessageService,
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      console.log('Retrieved ID:', this.id);
      this.userService.getUserById(this.id).subscribe((res) => {
        this.userObj = res as User;
      });
    });
  }
  userCurrentObj: any;
  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userId = user.uid; // Get the current user's ID

        console.log('user current', user);
        this.userService.getUserById(this.userId).subscribe((res) => {
          this.userCurrentObj = res;
        });
        this.loadMessages();
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  loadMessages() {
    const receiverId = this.id;
    this.chatService
      .getChatMessages(this.userId, receiverId)
      .subscribe((messages) => {
        this.messages = messages;
        console.log(this.messages);
        this.messages.map((i: any) => {
          this.userService.getUserById(i.senderId).subscribe((res) => {
            i.sender = res;
          });
        });
      });
  }

  sendMessage() {
    const receiverId = this.id;
    const newMessage: Chat = {
      senderId: this.userId,
      receiverId: receiverId,
      message: this.currentMessage,
      timestamp: firebase.firestore.Timestamp.now(),
      sender: null,
      receiver: null,
    };

    var lastMessage: RecentContact = {} as RecentContact;
    this.recentService
      .checkIfBothIdsExist(this.userId, this.id)
      .subscribe((res) => {
        console.log('recentService', res);
        if (res == null) {
          var usersListId = [];
          usersListId.push(receiverId);
          usersListId.push(this.userId);
          lastMessage = {
            idUsers: usersListId,
            lastIdSender: this.id,
            lastSender:
              this.userCurrentObj.firstName +
              ' ' +
              this.userCurrentObj.lastName,
            lastMessage: this.currentMessage,
            timestamp: firebase.firestore.Timestamp.now(),
          };
          this.recentService.addRecent(lastMessage).then(() => {
            console.log('ok');
          });
        } else {
          lastMessage = res;
          lastMessage.lastMessage = this.currentMessage;
          lastMessage.lastIdSender = this.id;
          lastMessage.lastSender =
            this.userCurrentObj.firstName + ' ' + this.userCurrentObj.lastName;
            this.recentService.updateRecent(lastMessage).then(() => {
              console.log('ok');
            });
        }
      });

    console.log('lastMessage', lastMessage);

    this.chatService.sendMessage(newMessage).then(() => {
      this.currentMessage = '';
      this.scrollToBottom();
    });
  }

  goBack() {
    this.router.navigateByUrl('tabs/chat');
  }
}
