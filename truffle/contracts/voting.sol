pragma solidity ^0.5.0;

import './AccountManagment.sol';

contract voting is AccountManagment{

    struct votes{
        address adr;
        bool v;
    }

    mapping (address => votes[]) public artVotes;

    function voteArticle(bool _up, address payable _artAddress) public payable{
        if(_up){
            artVotes[_artAddress].push(votes(msg.sender, true));
            _artAddress.transfer(msg.value);
            art[_artAddress].aRank += 1;
        }
        else{
            artVotes[_artAddress].push(votes(msg.sender, false));
            msg.sender.transfer(msg.value);
            (art[_artAddress].aRank != 0)? art[_artAddress].aRank -= 1 : art[_artAddress].aRank = 0;
        }
    }
    
    function getVote(uint _index, address _addr)public view returns(bool){
        return artVotes[_addr][_index].v;
    }

}