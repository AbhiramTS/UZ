pragma solidity ^0.5.0;

import './AccountManagment.sol';
import './Sqrt.sol';

contract voting is AccountManagment, Sqrt{

    function voteArticle(bool _up, address  _artAddress) public {
        if(_up){                                                             //upvote clicked
            if(art[_artAddress].artVotes[msg.sender] == vote.DEFAULT){          // if( neither Up nor down voted )
                art[_artAddress].artVotes[msg.sender] = vote.UP;                    // set vote to UP in mapping art(user_address -> vote)
                art[_artAddress].uVote += 1;                                        // increment upVote count
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.DOWN){        // if( down voted earlier )
                art[_artAddress].artVotes[msg.sender] = vote.UP;                    // set vote to UP in mapping art(user_address -> vote)
                art[_artAddress].uVote += 1;                                        // increment upVote count
                art[_artAddress].dVote -= 1;                                        // decrement downVote count
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.UP){          // if( already upvoted )
                art[_artAddress].artVotes[msg.sender] = vote.DEFAULT;               // set vote to DEFAULT (cancelled vote) in mapping art(user_address -> vote)
                art[_artAddress].uVote -= 1;                                        // decrement upVote count
            }
        }
        else{                                                               //downvote clicked
            if(art[_artAddress].artVotes[msg.sender] == vote.DEFAULT){          // if( neither Up nor down voted )
                art[_artAddress].artVotes[msg.sender] = vote.DOWN;                  // set vote to DOWN in mapping art(user_address -> vote)
                art[_artAddress].dVote += 1;                                        // increment upVote count
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.UP){          // if( up voted earlier )
                art[_artAddress].artVotes[msg.sender] = vote.DOWN;                  // set vote to DOWN in mapping art(user_address -> vote)
                art[_artAddress].uVote -= 1;                                        // decrement upVote count
                art[_artAddress].dVote += 1;                                        // increment downVote count
            }
            else if(art[_artAddress].artVotes[msg.sender] == vote.DOWN){        // if( already downvoted )
                art[_artAddress].artVotes[msg.sender] = vote.DEFAULT;               // set vote to DEFAULT (cancelled vote) in mapping art(user_address -> vote)
                art[_artAddress].dVote -= 1;                                        // decrement downVote count
            }
        }
        updateRanking(_artAddress);         // update articles ranking
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