import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import Users from '../build/contracts/Users.json'

var MyContract = contract(Users);

 MyContract.deployed().then(function(contractInstance) {  
    contractInstance.createUserRecord.sendTransaction("Perb", "Wong", 2, "01/01/2018");
  });

 MyContract.deployed().then(function(contractInstance) {  
    contractInstance.getUserRecord_fromID.call(2).then(function(v) {  
            console.log(v)  
        });  
  }); 
