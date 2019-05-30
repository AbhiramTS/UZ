import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Article } from '../ngDBModels';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  url = "/db/article";

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

  getArticleFromDB(artId):Observable<{}>{ 
    let response = new Subject<{}>();
    this.http.get(this.url+"/getArticle?artId="+artId)
              .subscribe(res=> {
              response.next(res);
            });
      return response.asObservable();
  }

  voteArticle(vote):Observable<{}>{  // vote = { artId: '', updtOpt: 1/2/3/4/5/6 }
    let response = new Subject<{}>();
    this.http.post(this.url+"/vote", vote)
              .subscribe(res=> {
              response.next(res);
            });
      return response.asObservable();
  }

}