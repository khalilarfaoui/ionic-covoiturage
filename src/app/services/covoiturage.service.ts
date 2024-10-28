import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CovoiturageService {
  private collectionName = 'covoiturages';

  constructor(private firestore: AngularFirestore) {}


  createCovoiturage(covoiturage: any): Promise<any> {

    return this.firestore.collection(this.collectionName).add(covoiturage);
  }


  getCovoiturages(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }


  getCovoiturageById(id: string): Observable<any> {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }


  updateCovoiturage(id: string, covoiturage: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(covoiturage);
  }


  deleteCovoiturage(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
