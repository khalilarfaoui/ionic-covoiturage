import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  Observable } from 'rxjs';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  email: string;

}



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection = this.firestore.collection<User>('users');

  constructor(private firestore: AngularFirestore) {}

  // Create a new user
  addUser(user: User): Promise<void> {
    const id = this.firestore.createId();
    return this.usersCollection.doc(id).set({ id, ...user });
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.usersCollection.doc<User>(id).valueChanges({ idField: 'id' });
  }

  // Update a user
  updateUser(user: User): Promise<void> {
    return this.usersCollection.doc(user.id).update(user);
  }

  // Delete a user
  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}
