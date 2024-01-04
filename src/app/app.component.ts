import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/drone.authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drone Registration';

  constructor(private auth: AuthService, private router: Router){}

  isLoggedIn = this.auth.isAdmin() || this.auth.isDataClerk() || this.auth.isDataManager()

 async onSignOut(){
    await localStorage.removeItem('token')
    alert('Signed out succesfully!')
    await this.router.navigate(['/login'])
  }
}
