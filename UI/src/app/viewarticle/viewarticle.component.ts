import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http'

import { AuthService } from '../services/auth.service';
import { Web3ServiceService } from '../services/web3-service.service';

@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit {


  private artLink = "http://localhost:3000/url?link=";
  private artId : string;
  private uID : string;
  private article = "Loading...";
  private upVotes = 154;  
  private downVotes = 26; 
  private upVoted = "";   // <<     }  TODO: get these details into an Article object and access from it
  private downVoted = ""; // << }
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router:Router,
    private web3 : Web3ServiceService
  ) { 
  }


  async ngOnInit() {
    this.uID = this.authService.getUserDetails();
    this.route.queryParams.subscribe(params => {
        this.getArticle(params.link);
      });
    const vote =await this.web3.getVote(this.artId,this.uID);
    if(vote === 1){
      this.upVoted = 'upvoted';
    }
    if(vote === 2){
      this.downVoted = 'downvoted';
    }
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
      // TODO: call the contract function to upvote
      this.web3.vote(true,this.artId,this.uID);
      this.upVoted = "upvoted";
      this.downVoted = "";
    }
  }

  downVote(){
    if(!this.authService.currentUserValue){
      //alert("Login to make upvote/downvote ");
      this.openModal(); 
    }
    else{
      // TODO: call the contract function to downvote & add voteArticle
      this.web3.vote(false,this.artId,this.uID);
      this.upVoted = "";
      this.downVoted = "downvoted";
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
