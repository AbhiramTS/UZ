pragma solidity ^0.5.0;

contract Vote {
    enum vote {
        DEFAULT,
        UP,
        DOWN
    }
    vote constant defaultVote = vote.DEFAULT;
    mapping(address => vote) userVote;
}