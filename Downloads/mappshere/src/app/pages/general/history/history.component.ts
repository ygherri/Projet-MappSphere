import { Component, inject, Input, OnInit } from '@angular/core';
import { WeatherHistory } from '../../../models/history';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HistoryService } from '../../../services/history.service';

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

  async getHistories(uid: any) {
    this.historyList = await this.historyService.getHistories(uid);
  }

  goToHistory(){
    this.router.navigate(['/history']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
