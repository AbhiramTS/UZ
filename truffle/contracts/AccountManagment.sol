pragma solidity ^0.5.0;

import "./Permission.sol";

contract AccountManagment is Permission{
    struct myNode{
        address owner;
    }
    mapping (address => myNode) nod;
    struct myUser{
        string name;
        string email;
        uint numPublisher;
        mapping (uint => address) myPublishers;
    }
    mapping (address => myUser) usr;
    struct myPublisher{
        string name;
        string webAddress;
        mapping (address => bool) myAuthors;
    }
    mapping(address => myPublisher) pub;
    struct myArticle{
        string artHash;
        address author;
        address publisher;
        string link;
        string timestamp;
    }
    mapping (address => myArticle) art;
    function newUser(address _uid, string memory _name, string memory _email) public onlyNode {
        usr[_uid] = myUser({name: _name, email : _email, numPublisher : 0});
        addUser(_uid);
    }
    function newPublisher(address _pid, string memory _name, string memory _webAddr) public{
        pub[_pid] = myPublisher({name: _name, webAddress : _webAddr});
        addPublisher(_pid);
    }
    function newArticle(address _artid, string memory _aHash, string memory _link,
                            address _auth, address _pub, string memory _tmstamp) public onlyUser{
        art[_artid] = myArticle({artHash: _aHash, author: _auth, publisher: _pub, link: _link, timestamp: _tmstamp });
        addArticle(_artid);
    }
}