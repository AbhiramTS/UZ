import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { ArticleService } from '../services/article.service';

import { Article } from '../ngDBModels';
import { TemplatingService } from '../services/templating.service';
import { Preview } from '../model';
import { Web3ServiceService } from '../services/web3-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-drafter',
  templateUrl: './drafter.component.html',
  styleUrls: ['./drafter.component.css']
})
export class DrafterComponent implements OnInit {

  link = "http://localhost:3000/";
  prvwPlaceholder = "<div class='draftPrvwPlaceholder' style='font-size: 30px;margin-left: auto;"
    +"margin-right:auto;margin: 0;position: relative;text-align: center;top: 45%;'>Article Preview Appears Here</div>";
  private myTmplt : any = this.prvwPlaceholder;
  private artHash = "";
  private disablePublish = true;
  private newArticle: Article;
  data;
  message = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private articleService: ArticleService,
    private template: TemplatingService,
    private web3: Web3ServiceService,
    private usr: AuthService
  ) { }

  ngOnInit() {
  }

  async getPreview(artLink){
    const linkTemp = this.link+"url?link="+artLink;
    this.http.get(this.link+"url?link="+artLink,{responseType: 'text'}).subscribe(async (data: any ) => {
      this.myTmplt = data;
      this.artHash = (await this.template.preview(`${this.link}preview?link=${linkTemp}`)).hash;
      this.disablePublish = false;
    });
  }

  async onSubmit(e){
    e.preventDefault();
    /* stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }*/
    const uID: string = this.usr.getUserDetails();
    const time: string = Date.toString();
    const linkTemp = this.link+"url?link="+"artLink"; //To do get Article link
    const prvw: Preview = await this.template.preview(`${this.link}preview?link=${linkTemp}`);
    const artId: string = await this.web3.newArticle(prvw.hash,"artLink",uID,time);
    this.newArticle = {
      artId: artId,
      hash: prvw.hash,
      title: prvw.data.title,
      link: 'artLink',
      author: prvw.data.author,
      authorId: uID,
      votes: [],
      upVotes: 1,
      downVotes: 0
    };
    if(artId !== ''){
      this.articleService.newArticle(this.newArticle)
        .subscribe(
            data => { // 'TODO : prevent redirect and show error msg if failed???
              this.router.navigate(['/']);
            },
            err => {
              this.message = err.error.msg;
            });
    }
  }

 

}
