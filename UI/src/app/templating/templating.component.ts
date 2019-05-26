import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-templating',
  templateUrl: './templating.component.html',
  styleUrls: ['./templating.component.css']
})
export class TemplatingComponent implements OnInit {
  
  private myTmplt : any = "loading...";
  @Input('link') link: string ;
  
  constructor(private http: HttpClient) {
    
   }

  ngOnInit() {
    this.http.get(this.link,{responseType: 'text'}).subscribe((data: any ) => {
      this.myTmplt = data;
    });
  }

  

}
