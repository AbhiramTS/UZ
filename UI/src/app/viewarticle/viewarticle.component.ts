import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http'

import { AuthService } from '../services/auth.service';
import { Web3ServiceService } from '../services/web3-service.service';
import { ArticleService } from '../services/article.service'; 

import { Article } from '../model';
import { User } from '../ngDBModels';

@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit {


  private artLink = "http://localhost:3000/url?link=";
  private artId : string;
  private usr : User;
  private article = "Loading...";
  private art;
  private articleFromDB;
  private upVotes = 154;  
  private downVotes = 26; 
  private upVoted = "";   
  private downVoted = "";
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService,
    private router:Router,
    private web3 : Web3ServiceService
  ) { 
  }


  async ngOnInit() {
    this.usr = this.authService.getUserDetails();
    this.route.queryParams.subscribe(params => {
        this.artId = params.artId;
        this.getArticle(params.link);
        this.articleService.getArticleFromDB(this.artId).subscribe((art)=>{
          this.articleFromDB = art;
          console.log(this.articleFromDB);
        });
      });
    console.log(this.artId);
    this.art = await this.web3.getArticle(this.artId,this.usr.userId.toString());
    const vote =await this.web3.getVote(this.artId,this.usr.userId.toString());
    if(vote === 1){
      this.upVoted = 'upvoted';
      this.downVoted = '';
    }
    if(vote === 2){
      this.downVoted = 'downvoted';
      this.upVoted = '';
    }
  }

  getArticle(link){
    console.log(this.artLink+link);
    this.http.get(this.artLink+link,{responseType: 'text'}).subscribe((data: any ) => {
      this.article = data;
    });
  }

  async checkVotedOrNot(){
    let vote = await this.web3.getVote(this.artId,this.usr.userId.toString());
    if(vote === 1){
      this.upVoted = 'upvoted';
      this.downVoted = '';
    }
    else if(vote === 2){
      this.downVoted = 'downvoted';
      this.upVoted = '';
    }
    else{
      this.upVoted = '';
      this.downVoted = '';
    }
  }

  upVote(){
    if(!this.authService.currentUserValue){
      this.openModal();      
    }
    else{
      let opt: number;
      if(this.upVoted == "upvoted"){
        opt = 2;    //already upvoted -> cancel upvote
        this.upVoted = "";
        this.downVoted = "";
      } 
      else if(this.downVoted == "downvoted"){
        opt = 5;   //earlier downvoted -> change to upvote
        this.upVoted = "unfinishedUp";
      } 
      else{
        opt = 1;   //upvote
        this.upVoted = "unfinishedUp";
      } 
      const vote = this.web3.vote(true,this.artId,this.usr.userId.toString(), opt);

      vote.on('transactionHash', async(th: string) => {
        console.log(th);
        let c = await this.conf(th);
        if(c){
          this.db(opt);
        }
      });
      vote.on('receipt', (r: any) =>{
        console.log(r);
      });
    }
  }

  downVote(){
    if(!this.authService.currentUserValue){
      this.openModal(); 
    }
    else{
      let opt: number;
      if(this.downVoted == "downvoted"){
        opt = 4;        //already downvoted -> cancel downvote
        this.upVoted = "";
        this.downVoted = "";
      } 
      else if(this.upVoted == "upvoted"){
        opt = 6;       //earlier upvoted -> change to downvote
        this.downVoted = "unfinishedDown";
      }
      else{
        opt = 3;       //downvote
        this.downVoted = "unfinishedDown";
      }
      const vote = this.web3.vote(false,this.artId,this.usr.userId.toString(), opt);

      vote.on('transactionHash', async(th: string) => {
        console.log(th);
        let c = await this.conf(th);
        if(c){
          this.db(opt);
        }
      });
      vote.on('receipt', (r: any) =>{
        console.log(r);
      });

      
      // this.web3.vote(false,this.artId,this.usr.userId.toString()).then(()=>{
      //   this.articleService.voteArticle({artId: this.artId, updtOpt: opt}).subscribe((art)=>{
      //     this.articleFromDB = art;
      //     this.checkVotedOrNot();
      //     this.art = this.web3.getArticle(this.artId,this.usr.userId.toString());
      //   });
      //   console.log(this.articleFromDB);
      // });
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

  conf = async (th: string) => {
    let cnfrmd : boolean = false;
    let count = 1;
      while(!cnfrmd){
        console.log(count++);
        cnfrmd = await this.web3.transConf(th);
        await this.web3.delay(1000);
      }
      return (cnfrmd);
  }

  db = (opt: number) => {
    this.articleService.voteArticle({artId: this.artId, updtOpt: opt}).subscribe((art)=>{
      this.articleFromDB = art;
      this.checkVotedOrNot();
      this.art = this.web3.getArticle(this.artId,this.usr.userId.toString());
    });
    console.log(this.articleFromDB);
  }

}
