import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) {

    const { firstName, lastName, phoneNumber, email, password } = userData;
    console.log('Tentative d\'inscription avec:', email);
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User registered successfully:', userCredential);
        if (userCredential.user) {
          this.firestore.collection('users').doc(userCredential.user.uid).set({
            firstName,
            lastName,
            phoneNumber,
            email,
          });
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        throw error; // Laissez l'erreur remonter pour la gestion dans le composant
      });
  }
  logout() {
    return this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.user;
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }


}
