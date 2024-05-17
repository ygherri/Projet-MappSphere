import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import * as fr from '@angular/common/locales/fr';
import { LayoutModule } from './layout/layout.module';
import { AuthGoogleService } from './services/auth-google.service';
import { OAuthService, UrlHelperService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';
  constructor() {
    registerLocaleData(fr.default);
  }
}
