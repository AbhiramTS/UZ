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
            art[_artAddress].uVote += 1;
        }
        else{
            artVotes[_artAddress].push(votes(msg.sender, false));
            msg.sender.transfer(msg.value);
            art[_artAddress].dVote += 1;
            aRanking(_artAddress, msg.sender);
            //(art[_artAddress].aRank != 0)? art[_artAddress].aRank -= 1 : art[_artAddress].aRank = 0;
        }
    }
    
    function getVote(uint _index, address _addr)public view returns(bool){
        return artVotes[_addr][_index].v;
    }

    function aRanking(address _artAddress, address _voter) public{
        uint tVotes = art[_artAddress].uVote + art[_artAddress].dVote;
        uint voterWeight = (usr[_voter].uRank * 25) / 100;
        if(art[_artAddress].uVote > art[_artAddress].dVote){
            art[_artAddress].aRank += ((((art[_artAddress].uVote - art[_artAddress].dVote) * 25) / 100) + voterWeight + (tVotes * 50) / 100) / 10;
            //some crazy ranking method
        }
        else{
            art[_artAddress].aRank -= ((((art[_artAddress].uVote - art[_artAddress].dVote) * 25) / 100) + voterWeight + (tVotes * 50) / 100) / 10;
        }
    }

}