import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/WeatherService';
import { WeatherHistoryEntry } from '../../models/weather-history-entry.model';
import 'leaflet-control-geocoder';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PagesModule } from '../../pages/general/pages.module';
import { HistoryService } from '../../services/history.service';
import { WeatherHistory } from '../../models/history';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, PagesModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private map: any;
  temperature: number | null = null;
  weatherIcon: string | null = null;
  cityName: string | null = null;
  showHistory: boolean = false;
  history: WeatherHistoryEntry[] = [];
  firebaseAuth = inject(Auth);
  historyService = inject(HistoryService);
  historyList: WeatherHistory[] = [];

  uid: any;

  onHistory() {
    const _auth = getAuth();
    onAuthStateChanged(_auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        console.log();
        const body = {
          id: this.uid,
          city: this.cityName,
          weather: this.temperature,
          date: new Date().toString(),
        } as WeatherHistory;
        // await this.historyService.addHistory(user.uid,body);
        await this.historyService.addHistoryIfNotAddedToday(user.uid, body);
      }
    });
    this.router.navigate(['/history']);
  }

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {}

  updateHistory(entry: WeatherHistoryEntry): void {
    this.history.push(entry);
  }

  loadWeather(lat: number, lng: number): void {
    this.weatherService.getWeather(lat, lng).subscribe({
      next: (data) => {
        this.temperature = data.main.temp;
        this.weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        this.cityName = data.name;

        this.updateHistory({
          city: data.name,
          temperature: data.main.temp,
          weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des données météo:',
          error
        );
      },
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.setLeafletIconPaths();
  }

  private setLeafletIconPaths(): void {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/images/marker-icon-2x.png',
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
    });
  }

  private initMap(): void {
    if (!this.map) {
      this.map = L.map('map').fitWorld();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      this.map.locate({
        setView: true,
        maxZoom: 16,
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000,
      });

      this.map.on('locationfound', (e: L.LocationEvent) => {
        const radius = e.accuracy / 2;
        L.marker(e.latlng, {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconRetinaUrl: 'assets/images/marker-icon-2x.png',
            iconUrl: 'assets/images/marker-icon.png',
            shadowUrl: 'assets/images/marker-shadow.png',
          }),
        }).addTo(this.map);
        L.circle(e.latlng, radius).addTo(this.map);

        this.loadWeather(e.latlng.lat, e.latlng.lng);
      });

      this.map.on('locationerror', (e: L.ErrorEvent) => {
        alert(`Erreur de localisation: ${e.message}`);
      });
    }
  }
  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.router.navigate(['/home']);
  }
  goToHistory() {
    this.router.navigate(['/history']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
