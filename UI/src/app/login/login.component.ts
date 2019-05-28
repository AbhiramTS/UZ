import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  url = "http://127.0.0.1:4000/auth";
  loginData = { email:'', pwd:'' };
  message = '';
  data: any;

  

  onSubmit(){
    /* stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }*/

    this.authService.login(this.loginData)
        .subscribe(
            data => {
                this.router.navigate(['/']);
            },
            err => {
              this.message = err.error.msg;
            });
  }

  // login() {
  //   this.http.post(this.url+'/login',this.loginData).subscribe(resp => {
  //     this.data = resp;
  //     console.log(this.data);
  //     localStorage.setItem('UZtoken', JSON.stringify(this.data));
  //     this.authService.login();
  //     this.router.navigate(['/']);
  //   }, err => {
  //     this.message = err.error.msg;
  //   });
  // }

}
