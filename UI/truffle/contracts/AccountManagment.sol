pragma solidity ^0.5.0;

import "./Permission.sol";
import "./Vote.sol";

contract AccountManagment is Permission, Vote{
    struct myNode{
        address owner;
    }
    struct votingData {
        address arAdd;
        vote artVote;
    }
    mapping (address => myNode) nod;
    struct myUser{
        string name;
        string email;
    }
    mapping (address => myUser) usr;

    struct myArticle{
        string artHash;
        address author;
        address publisher;
        string link;
        string timestamp;
        int64 aRank;
        int64 uVote;
        int64 dVote;
        mapping (address => vote) artVotes;
    }
    mapping (address => myArticle) public art;
    
    function newUser(address _uid, string memory _name, string memory _email) public  { //create new user
       
       require(user[_uid]!=true, "User already exists");                           // [2.0] {check if user already registered}
       {
           usr[_uid].name = _name;
           usr[_uid].email = _email;
            addUser(_uid);
       }
       
    }
    function newArticle(address _artid, string memory _aHash, string memory _link,      //create new article
        address _auth, address _pub, string memory _tmstamp) public onlyUser
    {
        require(articleStash[_aHash]!=true, "Article already exists");              // [2.0] {check if article already registered}
        {
            art[_artid] = myArticle({artHash: _aHash, author: _auth, publisher: _pub,
                link: _link, timestamp: _tmstamp, aRank : 0, uVote : 0, dVote : 0});
            addArticle(_artid, _aHash);
        }
    }
    function getUser(address _userAddress) public view returns(                     //return user details
        string memory name,
        string memory email
    ) {
        name = usr[_userAddress].name;
        email = usr[_userAddress].email;
    }
    function getArticle(address _artid) public view returns(                     //return article details
       string memory _artHash,
       address _author,
       address _publisher,
       string memory _link,
       string memory _timestamp,
       int _aRank,
       int _uVote,
       int _dVote
    ) {
        _artHash = art[_artid].artHash;
        _author = art[_artid].author;
        _publisher = art[_artid].publisher;
        _link = art[_artid].link;
        _timestamp = art[_artid].timestamp;
        _aRank = art[_artid].aRank;
        _uVote = art[_artid].uVote;
        _dVote = art[_artid].dVote;
    }
    
    // [2.0]
    
    struct donations{
        string donor;
        uint amnt;
    }
    
    mapping (address => donations[]) dons;

    function donate(address payable rcvr) public payable{
        require(msg.value>0, "Value should be greater than 0");
        donations memory d;
        d.donor = toString(msg.sender);
        d.amnt = msg.value;
        dons[rcvr].push(d);
        rcvr.transfer(msg.value);
    }
    
    function toString(address x) public pure returns (string memory) {
        //https://ethereum.stackexchange.com/questions/8346/convert-address-to-string
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

}