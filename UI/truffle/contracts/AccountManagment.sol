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
    function newUser(address _uid, string memory _name, string memory _email) public  {
       usr[_uid].name = _name;
       usr[_uid].email = _email;
        addUser(_uid);
    }
    function newArticle(address _artid, string memory _aHash, string memory _link,
        address _auth, address _pub, string memory _tmstamp) public onlyUser
    {
            art[_artid] = myArticle({artHash: _aHash, author: _auth, publisher: _pub,
                link: _link, timestamp: _tmstamp, aRank : 0, uVote : 0, dVote : 0});
        addArticle(_artid);
    }
    function getUser(address _userAddress) public view returns(
        string memory name,
        string memory email
    ) {
        name = usr[_userAddress].name;
        email = usr[_userAddress].email;
    }
    function getArticle(address _artid) public view returns(
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

}