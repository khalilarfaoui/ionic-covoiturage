import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from '../models/chat';
import { combineLatest, forkJoin, map, Observable } from 'rxjs';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatCollection = this.firestore.collection<Chat>('chats');

  constructor(private firestore: AngularFirestore) {}

  sendMessage(chatMessage: Chat): Promise<void> {
    const id = this.firestore.createId();
    return this.chatCollection.doc(id).set({ id, ...chatMessage });
  }
  private getUserById(userId: string): Observable<User> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges().pipe(
      map((user:any) => ({ id: userId, ...user }))
    );
  }

  getChatMessages(userId1: string, userId2: string): Observable<any[]> {
    return this.firestore.collection<Chat>('chats', ref =>
      ref.where('senderId', 'in', [userId1, userId2]).where('receiverId', 'in', [userId1, userId2])
    ).valueChanges({ idField: 'id' })
  }

}
