import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

import { Article } from '../ngDBModels';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  newsStream;
  constructor(private authService: AuthService, private articleService: ArticleService, private route: ActivatedRoute,) { 
    this.usr = {name : 'Test', userId : 'testId', email : 'test@test.com', dob: new Date('01-01-1970'), gender: 'Male'};
  }

  usr;
  ngOnInit() {
    this.authService.getProfile(this.route.snapshot.params.id).subscribe((usr)=>{
      this.usr = usr;
    });
    this.articleService.getStream().subscribe((stream: Article[])=>{ //TODO: get articles of this user
    this.newsStream = stream;
    });
  }

  /*newsStream = [
    {
      link: "https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314", 
      img: "https://cdn-images-1.medium.com/max/800/1*QTeLq8g_qQ-IL8ry7pBwrg.jpeg",
      title:"Learn using JWT with Passport authentication", 
      authorId: "ArpyVanyan", 
      author: "ArpyVanyan", 
      text: "Almost every web and mobile app nowadays has authentication. Most of them offer different login methods like Facebook, Google or email/password at once.", 
      votes: "151"
    },
    {
      link: "https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3", 
      img: "https://cdn-images-1.medium.com/max/800/1*LGin_twcro3znz90WO_ryQ.jpeg",
      title:"Angular Authentication: Using Route Guards", 
      authorId: "RyanChenkie", 
      author: "RyanChenkie", 
      text: "Angular comes with a number of baked-in features which are tremendously helpful for handling authentication. I think my favorite is probably its HttpInterceptor interface, but right next to it would be route guards.", 
      votes: "51"
    },
    {
      link: "https://medium.com/@shreyamduttagupta/api-authentication-using-passport-js-and-json-web-tokens-a6094df40ab0", 
      img: "https://cdn-images-1.medium.com/max/800/1*y_9QdaqJpI2HwIRVNh442Q.png",
      title:"API Authentication using Passport JS and JSON Web Tokens.", 
      authorId: "ShreyamDattaGupta", 
      author: "ShreyamDattaGupta", 
      text: "Lately, I have been working on a MEAN stack Authentication Application using Node JS, Express & MongoDB in the backend and Angular JS and Bootstrap in the Front. ", 
      votes: "138"
    },
    {
      link: "https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0", 
      img: "https://cdn-images-1.medium.com/max/800/1*Rbsr4P1KBcUD9wtQzquYwg.png",
      title:"Easy Google Auth for Node.js", 
      authorId: "JackRScott", 
      author: "JackRScott", 
      text: "I’m not sure if you have ever looked at the code inside the Passport.js library but there isn’t very much of it, and it isn’t very good either. It’s basically a little bit of code that makes sure that your authentication credentials are put in the correct place.", 
      votes: "47"
    },
    {
      link: "https://medium.com/fbdevclagos/developing-basic-crud-operations-with-node-express-and-mongodb-e754acb9cc15", 
      img: "https://cdn-images-1.medium.com/max/1200/1*_ZG0DVSrBDw0CsYnrvhP6w.jpeg",
      title:"Develop CRUD Operations with Node, Express, and MongoDB", 
      authorId: "SylvaElendu", 
      author: "SylvaElendu",
      text: "This article is the third part of a series. I recommend you read the first article to understand the purpose of this series, and the second article to learn how to set up your development work environment. I should also mention that creating an API requires intermediate development skills,", 
      votes: "215"
    }
  ];*/

}
