pragma solidity ^0.5.0;

contract AccountManagment {
    
    struct article{
        string artHash;
        address artId;
        address author;
        address publisher;
        string link;
        string timestamp;
    }
    
    struct publisher{
        address pubId;
        string name;
        string webAddress;
        mapping (address => bool) myAuthors;
    }
    
    struct user{
        address usrId;
        string name;
        string email;
        uint numPublisher;
        mapping (uint => address) myPublishers;
    }
    
    struct node{
        address nodeId;
        address owner;
    }
    
}