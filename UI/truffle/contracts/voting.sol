pragma solidity ^0.5.0;

import './AccountManagment.sol';
import './Sqrt.sol';

contract voting is AccountManagment, Sqrt{

    function voteArticle(bool _up, address  _artAddress) public {
        if(_up){
            if(art[_artAddress].artVotes[msg.sender] == vote.DEFAULT){
                art[_artAddress].artVotes[msg.sender] = vote.UP;
                art[_artAddress].uVote += 1;
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.DOWN){
                art[_artAddress].artVotes[msg.sender] = vote.UP;
                art[_artAddress].uVote += 1;
                art[_artAddress].dVote -= 1;
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.UP){
                art[_artAddress].artVotes[msg.sender] = vote.DEFAULT;
                art[_artAddress].uVote -= 1;
            }
        }
        else{
            if(art[_artAddress].artVotes[msg.sender] == vote.DEFAULT){
                art[_artAddress].artVotes[msg.sender] = vote.DOWN;
                art[_artAddress].dVote += 1;
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.UP){
                art[_artAddress].artVotes[msg.sender] = vote.DOWN;
                art[_artAddress].uVote -= 1;
                art[_artAddress].dVote += 1;
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.DOWN){
                art[_artAddress].artVotes[msg.sender] = vote.DEFAULT;
                art[_artAddress].dVote -= 1;
            }
        }
        updateRanking(_artAddress);
    }

    function updateRanking(address _artAddress) public{
      art[_artAddress].aRank = 10*(sqrt(art[_artAddress].uVote) - sqrt(art[_artAddress].dVote));
    }

    function getVote(address _artAddress) public view returns(vote _artVote) {
        _artVote = art[_artAddress].artVotes[msg.sender];
    }

}

/*

struct votes{
        address adr;
        bool v;
    }

    mapping (address => votes[]) public artVotes;

    function getVote(uint _index, address _addr)public view returns(bool){
        return artVotes[_addr][_index].v;
    }

//for(uint i = 0; i < artVotes[_artAddress].length; i++)
            // {
            //     if(artVotes[_artAddress][i].adr == msg.sender){
            //         found = true;
            //         if(artVotes[_artAddress][i].v == true){
            //             delete (artVotes[_artAddress])[i];
            //             art[_artAddress].uVote -= 1;
            //         }
            //         else{
            //             artVotes[_artAddress][i].v = true;
            //             art[_artAddress].uVote += 1;
            //             art[_artAddress].dVote -= 1;
            //         }
            //     }
            // }
            // if(!found){
            //     artVotes[_artAddress].push(votes(msg.sender, true));
            //     art[_artAddress].uVote += 1;
            // }
            // art[_artAddress].artVotes[msg.sender] = vote.UP;{
            // for(uint i = 0; i < artVotes[_artAddress].length; i++)
            // {
            //     if(artVotes[_artAddress][i].adr == msg.sender){
            //         found = true;
            //         if(artVotes[_artAddress][i].v == false){
            //             delete (artVotes[_artAddress])[i];
            //             art[_artAddress].dVote -= 1;
            //         }
            //         else{
            //             artVotes[_artAddress][i].v = false;
            //             art[_artAddress].uVote -= 1;
            //             art[_artAddress].dVote += 1;
            //         }
            //     }
            // }
            // if(!found){
            //     artVotes[_artAddress].push(votes(msg.sender, false));
            //     art[_artAddress].dVote += 1;
            // }
            // art[_artAddress].artVotes[msg.sender] = vote.DOWN;
        //}
        */