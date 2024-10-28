import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';

export interface RecentContact {
  id?: string;
  idUsers: string[];
  lastSender: string;
  lastIdSender : string ;
  lastMessage: string;
  timestamp: firebase.firestore.Timestamp;
}
@Injectable({
  providedIn: 'root'
})
export class RecentMessageService {
  private recCollection = this.firestore.collection<RecentContact>('recents');
  constructor(private firestore: AngularFirestore) { }
  // Get all users
  getRec(): Observable<RecentContact[]> {
    return this.recCollection.valueChanges({ idField: 'id' });
  }


  getContactsByUserId(id: string): Observable<RecentContact[]> {
    return this.firestore.collection<RecentContact>('recents', ref =>
      ref.where('idUsers', 'array-contains', id)
    ).valueChanges();
  }
  checkIfBothIdsExist(id1: string, id2: string): Observable<RecentContact | null> {
    return this.firestore.collection<RecentContact>('recents', ref =>
      ref.where('idUsers', 'array-contains', id1)
    )
    .get()  // Use get() instead of valueChanges() to fetch data only once
    .pipe(
      map(snapshot => {
        const contacts = snapshot.docs.map(doc => doc.data() as RecentContact);
        const contact = contacts.find(c => c.idUsers.includes(id2));
        return contact || null;
      })
    );
  }

  // Methods to add and update recent contacts
  addRecent(recent: RecentContact): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('recents').doc(id).set({ ...recent, id });
  }

  updateRecent(recent: RecentContact): Promise<void> {
    return this.firestore.collection('recents').doc(recent.id).update(recent);
  }
}
