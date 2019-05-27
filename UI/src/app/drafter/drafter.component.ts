import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { Article } from '../ngDBModels';

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

  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit() {
  }

  getPreview(artLink){
    //console.log(this.link+artLink);
    this.http.get(this.link+"url?link="+artLink,{responseType: 'text'}).subscribe((data: any ) => {
      this.myTmplt = data;
      this.artHash = "> Pass article hash generated here <";
      this.disablePublish = false;
    });
  }

  publish(){ //UNFINISHED
    this.newArticle = {
      artId: 'testid',
      hash: 'testhash',
      title: 'testTitle',
      link: 'https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314',
      author: 'testAuthor',
      authorId: 'authorID',
      votes: []
    }
    this.http.post(this.link+"article/submit",this.newArticle).subscribe(resp => {
      this.data = resp;
      console.log(this.data);
      this.router.navigate(['/']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}
