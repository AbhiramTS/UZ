import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from "@angular/router";

import { User } from '../ngDBModels';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://127.0.0.1:4000/auth";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  //data:any;
  //message = "";
  private curUser;

  constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('UZtoken')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }


/* TO BE USED ALONG WITH ONSUBMIT FUNCTION IN LOGIN COMPONENT
  login(loginData) {
    this.http.post(this.url+'/login',loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('UZtoken', this.data.token);
                this.currentUserSubject.next(this.data);
                return this.data;
            }, err => {
              this.message = err.error.msg;
            });
  }
  */

  login(){
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('UZtoken')));
  }


  logout() {
    localStorage.removeItem('UZtoken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
