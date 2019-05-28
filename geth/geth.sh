#!/bin/bash
geth --identity "miner" --networkid 4002 --datadir data --rpc --rpcport "8545" --unlock 0,1,2,3,4  --password password.txt --ipcpath "~/.ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal"
#geth --identity "miner" --networkid 4002 --datadir dataMultiple --rpc --rpcport "8545"   --ipcpath "~/.ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal"
