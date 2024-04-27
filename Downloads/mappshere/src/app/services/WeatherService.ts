import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '7af7a7afab11d29e94bc5b166997b258'
  private url = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(this.url, {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        appid: this.apiKey,
        units: 'metric', 
      },
    });
  }
}
