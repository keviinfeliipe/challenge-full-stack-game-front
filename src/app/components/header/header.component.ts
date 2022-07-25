import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  user: User = {
    email: '',
    displayName: '',
    uid: '',
    photoURL: '',
    emailVerified: false
  };

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user => {
      if(user) {
        this.user = user;
        console.log('USER', user);
      }
    })
  }

  goToHome(){
    this.router.navigate(['dashboard']);
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

  SignOut(){
    this.authService.SignOut();
  }

}
