import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http'

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit {


  private artLink = "http://localhost:3000/url?link=";
  private article = "Loading...";
  private upVotes = 154;
  private downVotes = 26;
  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService, private router:Router) { 
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.getArticle(params.link);
      });
  }

  getArticle(link){
    console.log(this.artLink+link);
    this.http.get(this.artLink+link,{responseType: 'text'}).subscribe((data: any ) => {
      this.article = data;
    });
  }

  upVote(){
    if(!this.authService.currentUserValue){
      //alert("Login to make upvote/downvote ");
      this.openModal();      
    }
    else{
      //call the contract function to upvote
    }
  }

  downVote(){
    if(!this.authService.currentUserValue){
      //alert("Login to make upvote/downvote ");
      this.openModal(); 
    }
    else{
      //call the contract function to downvote
    }
  }

  openModal() {
    document.getElementById('openModalButton').click();
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

  redirectToRegister(){
    this.router.navigate(['/register']);
  }

}
