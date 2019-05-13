import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../services/web3-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: String[];

  constructor(private web3Service : Web3ServiceService) {
    console.info(web3Service);
   }

  ngOnInit() {
    console.info(this.web3Service);    
    this.getAccount();
  }

  getAccount = () => {
  this.web3Service.myAccountsObservable.subscribe((accounts) =>{
    this.accounts = accounts;
  });  
  }

  

}
