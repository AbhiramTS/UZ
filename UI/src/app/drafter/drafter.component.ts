import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-drafter',
  templateUrl: './drafter.component.html',
  styleUrls: ['./drafter.component.css']
})
export class DrafterComponent implements OnInit {

  link = "http://localhost:3000/url?link=";
  prvwPlaceholder = "<div class='draftPrvwPlaceholder' style='font-size: 30px;margin-left: auto;"
    +"margin-right:auto;margin: 0;position: relative;text-align: center;top: 45%;'>Article Preview Appears Here</div>";
  private myTmplt : any = this.prvwPlaceholder;
  private artHash = "";
  private disablePublish = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getPreview(artLink){
    console.log(this.link+artLink);
    this.http.get(this.link+artLink,{responseType: 'text'}).subscribe((data: any ) => {
      this.myTmplt = data;
      this.artHash = "> Pass article hash generated here <";
      this.disablePublish = false;
    });
  }

}
