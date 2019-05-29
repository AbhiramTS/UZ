export class User
{
    userId : String;
    name :  String;
    email : String;
    password : String;
    dob : Date;
    gender : String;
    articles : [];
}

export class Article
{
    artId : String;
    hash : String;
    link : String;
    img: String;
    title : String;
    text: String;
    author : String;
    authorId : String;
    upVotes : Number;
    downVotes : Number;
    votes : [];
}