import { Component, inject, Input, OnInit } from '@angular/core';
import { WeatherHistory } from '../../../models/history';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HistoryService } from '../../../services/history.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  firebaseAuth = inject(Auth);
  historyService = inject(HistoryService);

  historyList: WeatherHistory[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getHistories(user.uid)
      } else {
        console.log('Aucun utilisateur n\'est connecté');
      }
    });
  }

  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.router.navigate(['/home']);
  }

  async getHistories(uid: string): Promise<void> {
    try {
      const histories: DocumentData[] = await this.historyService.getHistories(uid);
      this.historyList = histories.map((history: DocumentData) => {
        return {
          city: history['city'],
          weather: history['weather'],
          date: this.convertToDate(history['date'])
        } as WeatherHistory;
      });
      console.log(this.historyList);
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques:', error);
    }
  }

  convertToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day); 
  }

  goToHistory(){
    this.router.navigate(['/history']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
