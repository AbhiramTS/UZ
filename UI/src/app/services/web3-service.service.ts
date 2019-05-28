import { Injectable } from '@angular/core';
import * as web3 from 'web3';
import {Subject} from 'rxjs';
import { ContractJSON, Acnt, Article } from '../model'
import { hexToNumber } from 'web3-utils';

const Web3 = web3.default;

const MyContractJSON: ContractJSON = require('../../../../truffle/build/contracts/Main.json');

// const contractAddress = MyContractJSON.networks['4002'].address;
const contractAddress = MyContractJSON.networks[4002].address;
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
    console.log("Contract Address ->",contractAddress);
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

  getArticle = async (artAddress: string, userAddress: string):Promise<Article> => {
    
    let article : Article = await this.UZ.methods.getArticle(artAddress).call({from: userAddress}).then((v: Article) => {
      return v;
    });
    return article;
  }

  newArticle = ( artHash: string, link: string, userAddress: string, time: string) => {
    let article: Acnt = this.myWeb3.eth.accounts.create(this.myWeb3.utils.randomHex(32));
    this.UZ.methods.newArticle(article.address, artHash, link, userAddress, userAddress, time)
      .send({from: userAddress, gas: 6000000});
  }

  newUser = ( name: string, emai: string, userAddress: string) => {
    this.UZ.methods.newUser(userAddress, name, emai).send({from: userAddress, gas: 6000000}).then( v => {
      console.log(v);
    });
  }

  getUser = (userAddress: string) => {
    this.UZ.methods.getUser(userAddress).call({from: userAddress}).then((v) => {
      console.log(v);
    });
  }

  vote = (vote: Boolean, artAddress: string, userAddress: string) => {
    this.UZ.methods.voteArticle(vote, artAddress).send({from: userAddress, gas: 6000000});
  }
}
