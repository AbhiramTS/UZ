import { Component, OnInit } from '@angular/core';

import { Globals } from '../globals';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notifierPos = -500;

  constructor(private authService: AuthService, private globals: Globals) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

  Notifier(){
    this.notifierPos = (this.notifierPos < 0)? 5 : -500;
  }

  getColor(x){
    switch(x){
      case 1: return '#c7c71c';
      case 2: return 'green';
      case 9: return 'red';
      default: return 'black';
    }
  }

}
