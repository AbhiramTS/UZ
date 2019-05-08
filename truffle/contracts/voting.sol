pragma solidity ^0.5.0;

contract voting{

    struct votes{
        address adr;
        bool v;
    }

    mapping (address => votes[]) public artVotes;

    function voteArticle(bool _up, address payable _artAddress) public payable{
        if(_up){
            artVotes[_artAddress].push(votes(msg.sender, true));
            _artAddress.transfer(msg.value);//this transfers msg.value from msg.sender to article
        }
        else{
            artVotes[_artAddress].push(votes(msg.sender, false));
            //what do we do here?
        }
    }
    
    function getVote(uint _index, address _addr)public view returns(bool){
        return artVotes[_addr][_index].v;
    }

}