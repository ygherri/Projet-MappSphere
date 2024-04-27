import { Injectable, inject } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

import { Firestore, addDoc, getDoc, setDoc, doc, getDocs, getFirestore, collection } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { WeatherHistory } from '../models/history';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  uid: any;
  historyList: WeatherHistory[] = [];
  constructor() { }

  async getHistories(userId: any) {
    const historyRef = collection(this.firestore, `users/${userId}/history`);
    const historySnapshot = await getDocs(historyRef)
    return historySnapshot.docs.map(doc => doc.data());
  }
  

  addHistory(userId: any, history: WeatherHistory) {
    const historyAddRef = collection(this.firestore, `users/${userId}/history`);
    return addDoc(historyAddRef, history);
  }

  async addHistoryIfNotAddedToday(userId: any, history: WeatherHistory): Promise<void> {
    const today = new Date().toLocaleDateString();
    const historyDocRef = doc(this.firestore, `users/${userId}/history/${history.id}`);
    
    const historyDocSnap = await getDoc(historyDocRef);

    if (!historyDocSnap.exists() || (historyDocSnap.data()?.['date'] !== today)) {
      await setDoc(historyDocRef, {
        city: history.city,
        weather: history.weather,
        date: today
      }, { merge: true });
    }
  }
}


