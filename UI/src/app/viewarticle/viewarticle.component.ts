import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit {

  private artLink = "http://localhost:3000/url?link=";
  private article = "Loading...";
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
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

}
