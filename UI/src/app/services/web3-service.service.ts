import { Injectable } from '@angular/core';
import * as web3 from 'web3';
import { maybeQueueResolutionOfComponentResources } from '@angular/core/src/metadata/resource_loading';

const Web3 = web3.default;

const MyContractJSON = require('../../../../truffle/build/contracts/Main.json');

const contractAddress = MyContractJSON.networks['4002'].address;
const abi = MyContractJSON.abi;
const web3Provider =new Web3.providers.HttpProvider('http://localhost:8545');
const myWeb3 = new Web3(web3Provider);

@Injectable({
  providedIn: 'root'
})
export class Web3ServiceService {
  
  public UZ = new myWeb3.eth.Contract(abi, contractAddress);
  public myAccounts: string[];
  
  constructor() { }

  getAccounts = () => {
    myWeb3.eth.getAccounts((err, accounts) =>{
      console.log('getting accounts');
      if(err != null){
        console.warn("An error occoured!!!");
      }

      if(accounts.length === 0){
        console.warn("Couldn't get any accounts!!!Error!!!");
      }
      else if( (this.myAccounts.length !== 0 || this.myAccounts.length !== accounts.length || this.myAccounts[0] !== accounts[0] ) ){
        this.myAccounts = accounts;
      }
    });
  }
}
