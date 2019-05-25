pragma solidity ^0.5.0;

import "./permission.sol";
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
        mapping (address => vote) myVotes;
        address[] artReg;
    }
    mapping (address => myUser) usr;

    struct myArticle{
        string artHash;
        address author;
        address publisher;
        string link;
        string timestamp;
        int aRank;
        int uVote;
        int dVote;
    }
    mapping (address => myArticle) public art;
    function newUser(address _uid, string memory _name, string memory _email) public onlyNode {
       usr[_uid].name = _name;
       usr[_uid].email = _email;
        addUser(_uid);
    }
    function newArticle(address _artid, string memory _aHash, string memory _link,
        address _auth, address _pub, string memory _tmstamp) public onlyUser
    {
            art[_artid] = myArticle({artHash: _aHash, author: _auth, publisher: _pub,
                link: _link, timestamp: _tmstamp, aRank : 100, uVote : 0, dVote : 0});
        addArticle(_artid);
    }
    function getUser(address _userAddress) public view returns(
        string memory name,
        string memory email,
        address[] memory voteReg
    ) {
        name = usr[_userAddress].name;
        email = usr[_userAddress].email;
        voteReg = usr[_userAddress].artReg;
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
     function getVote(address _artId, address _userId) public view returns(vote _artVote) {
        _artVote = usr[_userId].myVotes[_artId];
    }
}