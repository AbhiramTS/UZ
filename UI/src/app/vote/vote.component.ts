import { Component, OnInit, Input } from '@angular/core';

import { Web3ServiceService } from '../services/web3-service.service';
import { hexToNumber } from 'web3-utils';
import { Article } from '../model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input('user') private user: string;
  @Input('article') private article: string;
  @Input('userVote') private userVote: boolean;
  @Input('tVote') private tVote: number;

  private icon: string;
  private cls: string;

  constructor(private contract: Web3ServiceService) { }

  async ngOnInit() {
    if(this.userVote){
      this.icon = '<i class="fa fa-thumbs-up fa-large"></i>'
      this.cls = 'btn btn-success'
      let art: Article = await this.contract.getArticle(this.article,this.user);
      this.tVote = hexToNumber(art._uVote);
      console.log(this.tVote);
    }
    else{
      this.icon = '<i class="fa fa-thumbs-down fa-large"></i>'
      this.cls = 'btn btn-danger'
      let art: Article = await this.contract.getArticle(this.article,this.user);
      this.tVote = hexToNumber(art._dVote);
      console.log(this.tVote);
    }
    // this.tVote = 0;
  }

  vote = () => {
    this.contract.vote(this.userVote,this.article,this.user,0);
    this.tVote++;
  }

}
