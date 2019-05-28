import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Web3ServiceService } from '../services/web3-service.service'

import { User } from '../ngDBModels'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService, private web3S: Web3ServiceService) { }

  ngOnInit() {
    this.createForm();
  }

  registerForm: FormGroup;
  newUser: User;
  message = '';
  url = "http://127.0.0.1:4000/auth";

  createForm(){
    this.registerForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      reemail : ['', Validators.required],
      pwd : ['', Validators.required],
      dob : ['', Validators.required],
      gender : [''],
      userId : ['', Validators.required]
    });
  }

  onSubmit(){
    /* stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }*/
    this.newUser = {
      name : this.registerForm.get('name').value,
      email : this.registerForm.get('email').value,
      password : this.registerForm.get('pwd').value,
      dob : this.registerForm.get('dob').value,
      gender : this.registerForm.get('gender').value,
      userId : this.registerForm.get('userId').value,
      articles : []
    }; //TODO : insert into blockchain first then do this----|
       //                                                    | 
    this.authService.register(this.newUser)       //<--------|
        .subscribe(
            data => { // 'TODO : prevent redirect and show error msg if failed
              this.router.navigate(['/login']);
            },
            err => {
              this.message = err.error.msg;
            });

    this.web3S.newUser(this.newUser.name.toString(),this.newUser.email.toString(),this.newUser.userId.toString()); //TODO: do this before authService.register
  }


  

  // register(){
  //   this.newUser = {
  //     name : this.registerForm.get('name').value,
  //     email : this.registerForm.get('email').value,
  //     password : this.registerForm.get('pwd').value,
  //     dob : this.registerForm.get('dob').value,
  //     gender : this.registerForm.get('gender').value,
  //     articles : []
  //   };
  //   console.log('Sending req');
  //   this.http.post(this.url+'/register',this.newUser).subscribe(resp => {
  //     console.log(resp);
  //     this.router.navigate(['login']);
  //   }, err => {
  //     this.message = err.error.msg;
  //   });
  // }

}
