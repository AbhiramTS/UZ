import { Injectable } from '@angular/core';
import * as web3 from 'web3';
import {Subject} from 'rxjs';
import { maybeQueueResolutionOfComponentResources } from '@angular/core/src/metadata/resource_loading';

const Web3 = web3.default;

const MyContractJSON = require('../../../../truffle/build/contracts/Main.json');

// const contractAddress = MyContractJSON.networks['4002'].address;
const contractAddress = "0x3b1b2604f8a9bd987ebf2e7793182e3138f9ef23";
const abi = MyContractJSON.abi;
const web3Provider =new Web3.providers.HttpProvider("http://127.0.0.1:8545");

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3ServiceService {
  
  private myWeb3 :any;
  public UZ :any;
  public myAccounts: string[] = [];
  public myAccountsObservable = new Subject<String[]>();
  
  constructor() {
    this.startWeb3();
   }

  startWeb3 = () => {
    console.info("Starting Web3...");
    this.myWeb3 = new Web3(web3Provider);
    this.UZ = new this.myWeb3.eth.Contract(abi, contractAddress);
    if(!this.myWeb3.eth.net.isListening()){
      console.warn("Couldn't connect to any web3 provider!!!")
      return;
    }
    setTimeout(() => this.getAccounts(), 200); // changed to timeout as it was refreshing every 0.2 sec
  };

   getAccounts = () => {
    this.myWeb3.eth.getAccounts((error,accounts) =>{
      if(error){
        console.warn('There was an error fetching your accounts.');
        return;
      }
      console.log('getting accounts');
      // console.log(accounts);

      if(accounts.length === 0 ){
        console.warn("Couldn't get any accounts!!!Error!!!");
      }
      else if( (this.myAccounts.length !== 0 || this.myAccounts.length !== accounts.length || this.myAccounts[0] !== accounts[0] ) ){
        this.myAccountsObservable.next(accounts);
        this.myAccounts = accounts;
      }
    });
  }
}
