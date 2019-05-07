import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../services/web3-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: String[];

  constructor(private web3Service : Web3ServiceService) { }

  ngOnInit() {
    this.web3Service.getAccounts();
    this.accounts = this.web3Service.myAccounts;
  }

  

}
