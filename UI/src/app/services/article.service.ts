import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from '../ngDBModels';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:4000/article";

  getStream(){ // NOT TESTED
    this.http.get(this.url+'/getStream').subscribe((resp:Article) => {
      return resp;
    }, err => {
      return err.error.msg;
    });
  }
}
