pragma solidity ^0.5.0;

contract AccountManagment {
    
    struct node{
        address owner;
    }
    mapping (address => node) nod;
    
    struct user{
        string name;
        string email;
        uint numPublisher;
        mapping (uint => address) myPublishers;
    }
    mapping (address => user) usr;
    
    struct publisher{
        string name;
        string webAddress;
        mapping (address => bool) myAuthors;
    }
    mapping(address => publisher) pub;
    
    struct article{
        string artHash;
        address author;
        address publisher;
        string link;
        string timestamp;
    }
    mapping (address => article) art;
    

    function newUser(address _uid, string memory _name, string memory _email) public{
        usr[_uid] = user({name: _name, email : _email, numPublisher : 0});
    }
    
    function newPublisher(address _pid, string memory _name, string memory _webAddr) public{
        pub[_pid] = publisher({name: _name, webAddress : _webAddr});
    }
    
    function newArticle(address _artid, string memory _aHash, string memory _link, address _auth, address _pub, string memory _tmstamp) public{
        art[_artid] = article({artHash: _aHash, author: _auth, publisher: _pub, link: _link, timestamp: _tmstamp });
    }

}