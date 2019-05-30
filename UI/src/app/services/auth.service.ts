import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";

import { User } from '../ngDBModels';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://127.0.0.1:4000/auth";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private curUser;

  constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('UZtoken')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  getUserDetails(){  // returns the user details stored on localStorage >> name, mail, id(blank as of now), dob, gender
    return JSON.parse(localStorage.getItem('UZusr'));
  }


  login(loginData):Observable<{}>{
    let response = new Subject<{}>();
    let data;
    this.http.post(this.url+'/login',loginData)
              .subscribe(res=> {
                data = res;
                localStorage.setItem('UZtoken', JSON.stringify(data.token));
                localStorage.setItem('UZusr', JSON.stringify(data.usrdata));
                this.currentUserSubject.next(data);              
                response.next(res);
            });
      return response.asObservable();
  }

  register(newUser):Observable<{}>{
    let response = new Subject<{}>();
    let data;
    this.http.post(this.url+'/register',newUser)
              .subscribe(res=> {             
                response.next(res);
            });
      return response.asObservable();
  }

  logout() {
    localStorage.removeItem('UZtoken');
    localStorage.removeItem('UZusr');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getProfile(usrId):Observable<{}>{
    let response = new Subject<{}>();
    let data;
    this.http.post(this.url+'/getProfile',usrId)
              .subscribe(res=> {
                data = res;              
                response.next(res);
            });
      return response.asObservable();
  }




  // login(){
  //   this.currentUserSubject.next(JSON.parse(localStorage.getItem('UZtoken')));
  // }
}
