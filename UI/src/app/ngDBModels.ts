export class User
{
    //userId : String;
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
    title : String;
    author : String;
    authorId : String;
    votes : [];
}