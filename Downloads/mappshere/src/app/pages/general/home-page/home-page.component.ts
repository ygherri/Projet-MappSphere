import { Component, inject } from '@angular/core';
import { UcfirstPipe } from '../../../pipes/ucfirst.pipe';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { LayoutModule } from '../../../layout/layout.module';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UcfirstPipe, DatePipe, LayoutModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  firebaseAuth = inject(Auth);
  user: User | null = null;
  
  constructor(
    private router: Router,
  ) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  today: number = Date.now();
  public activePage!: string;

  gotodashboard() {
    this.router.navigate(['/dashboard']);
  }
  
 
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    
    await signInWithPopup(this.firebaseAuth, provider);
  }
  

}
