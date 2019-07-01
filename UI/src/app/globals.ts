import { Injectable } from '@angular/core';
import { notifi } from './model';

@Injectable()
export class Globals {

    Notifies: notifi[] = [
        // {
        //     time: "Jun 29, 2019, 4:21:30 PM",
        //     status: "Test status",
        //     statCode: 1,
        //     msg: "This is a a test message",
        //     txHash: "0x000000000000000",
        //     msgHist: []
        // },
        // {
        //     time: "Jun 29, 2019, 4:21:30 PM",
        //     status: "Test status 2",
        //     statCode: 1,
        //     msg: "This is a a test message 2",
        //     txHash: "0x100000000000000",
        //     msgHist: []
        // }
    ];
  
}