pragma solidity ^0.5.0;

import './AccountManagment.sol';

contract Main is AccountManagment {
    constructor(string memory _name, string memory _email) public {
        node[msg.sender] = true;
        newUser(msg.sender, _name, _email);
    }
}