import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Article } from '../ngDBModels';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:4000/article";

  getStream(){
    return this.http.get(this.url+'/getStream');
  }

  newArticle(art: Article):Observable<{}>{
    let response = new Subject<{}>();
    this.http.post(this.url+"/submit", art)
              .subscribe(res=> {
              response.next(res);
            });
      return response.asObservable();
  }

  voteArticle(vote):Observable<{}>{  // vote = { artId: '', upv: , downv: }
    let response = new Subject<{}>();
    this.http.post(this.url+"/voteSet", vote)
              .subscribe(res=> {
              response.next(res);
            });
      return response.asObservable();
  }

}