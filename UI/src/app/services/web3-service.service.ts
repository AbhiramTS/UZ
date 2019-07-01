import { Injectable } from '@angular/core';
import * as web3 from 'web3';
import {Subject} from 'rxjs';
import { ContractJSON, Acnt, Article } from '../model';

import { ArticleService } from './article.service';
import { Globals } from '../globals';

const Web3 = web3.default;

const MyContractJSON: ContractJSON = require('../../../truffle/build/contracts/Main.json');

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
  
  constructor(private articleService: ArticleService, private globals: Globals) {
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

  newArticle =  ( artHash: string, link: string, userAddress: string, time: string) => {
    let article: Acnt = this.myWeb3.eth.accounts.create(this.myWeb3.utils.randomHex(32));
    let func = this.UZ.methods.newArticle(article.address, artHash, link, userAddress, userAddress, time)
      .send({from: userAddress, gas: 6000000})
    return {
      artid: article.address,
      function: func
    }
  }

  
  newUser =  ( name: string, emai: string, userAddress: string) => {
    return this.UZ.methods.newUser(userAddress, name, emai).send({from: userAddress, gas: 6000000});
  }

  getUser = (userAddress: string) => {
    this.UZ.methods.getUser(userAddress).call({from: userAddress}).then((v) => {
      console.log(v);
    });
  }

  vote =  (vote: Boolean, artAddress: string, userAddress: string, voteUD: Number) => {
    return this.UZ.methods.voteArticle(vote, artAddress).send({from: userAddress.toString(), gas: 6000000})
    .on('transactionHash', async (tHash: string) => {
      let vStat;
      if(voteUD == 1 || voteUD == 5)vStat="Up";
      else if(voteUD == 3 || voteUD == 6)vStat="Down";
      else vStat = "Cancel ";
      this.globals.Notifies.push(
        {
          time: String(Date.now()), 
          status: "Tx. hash generated", 
          statCode: 1, 
          msg: vStat+"vote on article", 
          txHash: tHash, 
          msgHist: [{}]
        });
      console.log(tHash);
    })
    .on('receipt', async (tranReceipt) =>{
      let t = this.globals.Notifies.findIndex(i=>i.txHash == tranReceipt.transactionHash);
      this.globals.Notifies[t].msgHist.push({oldm: this.globals.Notifies[t].status, t: this.globals.Notifies[t].time, stat: this.globals.Notifies[t].statCode});
      this.globals.Notifies[t].time = String(Date.now());
      this.globals.Notifies[t].statCode = 2;
      this.globals.Notifies[t].status = "Tx. receipt generated";
      console.log(tranReceipt);
      return true;
    })
    .on('error', (err)=>{

      let t = this.globals.Notifies.findIndex(i=>i.txHash == err.transactionHash);
      if(t){
        this.globals.Notifies[t].msgHist.push({oldm: this.globals.Notifies[t].status, t: this.globals.Notifies[t].time, stat: this.globals.Notifies[t].statCode});
        this.globals.Notifies[t].time = String(Date.now());
        this.globals.Notifies[t].statCode = 3;
        this.globals.Notifies[t].status = "Tx. failed";
        console.log(err);
        return false;
      }
      else{
        this.globals.Notifies.push(
          {
            time: String(Date.now()), 
            status: "Tx. failed", 
            statCode: 3, 
            msg: (vote==true)?"Up":"Down"+"Vote article", 
            txHash: "---", 
            msgHist: [{}]
          });
        console.log(err);
        return false;
      }
    });
  }

  // vote = async (vote: Boolean, artAddress: string, userAddress: string) => {
  //   let cnfrmd: boolean = false;
  //   await this.UZ.methods.voteArticle(vote, artAddress).send({from: userAddress.toString(), gas: 6000000})
  //   .on('transactionHash', async (tHash: string) => {
  //     console.log(tHash);
  //     let count = 1;
  //     while(!cnfrmd){
  //       cnfrmd =await this.transConf(tHash);
  //       await this.delay(1000);
  //       console.log(count++);
  //     }
  //   });
  //   return cnfrmd;
  // }

  getVote = async (artAddress: string, userAddress: String) => {
    const myVote: number = await this.UZ.methods.getVote(artAddress).call({from: userAddress});
    return myVote;
  }

  transConf = async (tranHash : string) : Promise<boolean> => {
    try{
      const tresp = await this.myWeb3.eth.getTransaction(tranHash);
      return tresp.blockNumber === null ? false : true;
    }
    catch(e){
      console.log(e);
      return false;
    }
  }

  delay = async (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // d = async (f: boolean) => {
  //   return new Promise(async (resolve) => {
  //     while(!f){
  //       f = await this.transConf(tHash);
  //     }
  //     resolve;      
    // });
  // }



  // [2.0]


  donate = async (userAddress: string, toName: String, toAddr: string, amnt:string) => {
    let cnfrmd: boolean = false;
    this.UZ.methods.donate(toAddr).send({from: userAddress, to: toAddr, gas: 6000000, value: this.myWeb3.utils.toWei(amnt, "ether")})
      .on('transactionHash', async (tHash: string) => {
        this.globals.Notifies.push(
          {
            time: String(Date.now()), 
            status: "Tx. hash generated", 
            statCode: 1, 
            msg: "Donation to "+toName+" of "+amnt+" ether", 
            txHash: tHash, 
            msgHist: [{}]
          });
        console.log(tHash);
      })
      .on('receipt', async (tranReceipt) =>{
        let t = this.globals.Notifies.findIndex(i=>i.txHash == tranReceipt.transactionHash);
        this.globals.Notifies[t].msgHist.push({oldm: this.globals.Notifies[t].status, t: this.globals.Notifies[t].time, stat: this.globals.Notifies[t].statCode});
        this.globals.Notifies[t].time = String(Date.now());
        this.globals.Notifies[t].statCode = 2;
        this.globals.Notifies[t].status = "Tx. receipt generated";
        console.log(tranReceipt);
        return true;
      })
      .on('error', (err)=>{

        let t = this.globals.Notifies.findIndex(i=>i.txHash == err.transactionHash);
        if(t){
          this.globals.Notifies[t].msgHist.push({oldm: this.globals.Notifies[t].status, t: this.globals.Notifies[t].time, stat: this.globals.Notifies[t].statCode});
          this.globals.Notifies[t].time = String(Date.now());
          this.globals.Notifies[t].statCode = 3;
          this.globals.Notifies[t].status = "Tx. failed";
          console.log(err);
          return false;
        }
        else{
          this.globals.Notifies.push(
            {
              time: String(Date.now()), 
              status: "Tx. failed", 
              statCode: 3, 
              msg: "Donation to "+toName+" of "+amnt+" ether", 
              txHash: "---", 
              msgHist: [{}]
            });
          console.log(err);
          return false;
        }
      });
    }

    // .then((tx) => {
    //   console.log(tx);
    //   return true;
    // }).catch((err)=>{
    //   console.log(err);
    //   return false;
    // });


}



// tranReceipt = async (tranHash: String) : Promise<boolean> => {
  //   try{
  //     const tresp = await this.myWeb3.eth.getTransactionReceipt(tranHash, (e, data) => {
  //       if (e !== null) {
  //           console.log("Could not find a transaction for your id! ID you provided was " + tranHash);
  //       } 
  //       else {
  //           console.log(data);
  //           if(data.status == '0x0') {
  //               console.log("The contract execution was not successful, check your transaction !");
  //               return false;
  //           } else {
  //               console.log("Execution worked fine!");
  //               return true;
  //           }
  //       }
  //     });
  //   }
  //   catch(e){
  //     console.log(e);
  //     return false;
  //   }
  // }