pragma solidity ^0.5.0;

contract Permission{

    mapping (address => bool) node;
    mapping (address => bool) publisher;
    mapping (address => bool) article;
    mapping (address => bool) user;
    function isNode( address _temp ) private view returns(bool _val) {
        _val = node[_temp];
    }
    function isPublisher( address _temp ) private view returns(bool _val) {
        _val = publisher[_temp];
    }
    function isArticle( address _temp ) private view returns(bool _val) {
        _val = article[_temp];
    }
    function isUser( address _temp ) private view returns(bool _val) {
        _val = user[_temp];
    }
    modifier onlyNode{
        require(isNode(msg.sender),"Can only be accessed by node!!!");
        _;
    }
    modifier onlyPublisher{
        require(isPublisher(msg.sender),"Can only be accessed by publisher!!!");
        _;
    }
    modifier onlyArticle{
        require(isArticle(msg.sender),"Can only be accessed by article!!!");
        _;
    }
    modifier onlyUser{
        require(isUser(msg.sender),"Can only be accessed by user!!!");
        _;
    }
    function addNode(address _temp) public onlyUser {       //unused
        node[_temp] = true;
    }
    function addPublisher(address _temp) public onlyUser {  //unused
        publisher[_temp] = true;
    }
    function addArticle(address _temp) public onlyUser {
        article[_temp] = true;
    }
    function addUser(address _temp) public{
        user[_temp] = true;
    }
}