pragma solidity ^0.5.0;

import './AccountManagment.sol';
import './Sqrt.sol';

contract voting is AccountManagment, Sqrt{

    struct votes{
        address adr;
        bool v;
    }

    mapping (address => votes[]) public artVotes;

    function voteArticle(bool _up, address  _artAddress) public {
        bool found;
        if(_up){
            for(uint i = 0; i < artVotes[_artAddress].length; i++)
            {
                if(artVotes[_artAddress][i].adr == msg.sender){
                    found = true;
                    if(artVotes[_artAddress][i].v == true){
                        delete (artVotes[_artAddress])[i];
                        art[_artAddress].uVote -= 1;
                    }
                    else{
                        artVotes[_artAddress][i].v = true;
                        art[_artAddress].uVote += 1;
                        art[_artAddress].dVote -= 1;
                    }
                }
            }
            if(!found){
                artVotes[_artAddress].push(votes(msg.sender, true));
                art[_artAddress].uVote += 1;
            }
            art[_artAddress].artVotes[msg.sender] = vote.UP;
        }
        else{
            for(uint i = 0; i < artVotes[_artAddress].length; i++)
            {
                if(artVotes[_artAddress][i].adr == msg.sender){
                    found = true;
                    if(artVotes[_artAddress][i].v == false){
                        delete (artVotes[_artAddress])[i];
                        art[_artAddress].dVote -= 1;
                    }
                    else{
                        artVotes[_artAddress][i].v = false;
                        art[_artAddress].uVote -= 1;
                        art[_artAddress].dVote += 1;
                    }
                }
            }
            if(!found){
                artVotes[_artAddress].push(votes(msg.sender, false));
                art[_artAddress].dVote += 1;
            }
            art[_artAddress].artVotes[msg.sender] = vote.DOWN;
        }
        updateRanking(_artAddress);
    }
    function getVote(uint _index, address _addr)public view returns(bool){
        return artVotes[_addr][_index].v;
    }

    function updateRanking(address _artAddress) public{
      art[_artAddress].aRank = 10*(sqrt(art[_artAddress].uVote) - sqrt(art[_artAddress].dVote));
    }

}