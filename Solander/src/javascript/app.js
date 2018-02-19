// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
// VotingContract = web3.eth.contract(abi);
// // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// contractInstance = VotingContract.at('0x2a9c1d265d06d47e8f7b00ffa987c9185aecf672');
// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

// function voteForCandidate() {
//   candidateName = $("#candidate").val();
//   contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
//     let div_id = candidates[candidateName];
//     $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//   });
// }

// $(document).ready(function() {
//   candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString()
//     $("#" + candidates[name]).html(val);
//   }
// });

App = {
  // set default web3 to null, contracts to empty
  web3Provider: null,
  contracts: {},

  init: function() {
    /*
      misc loads if needed, templates etc. 
    */

    // call init web3 after initiation is finished
    return App.initWeb3();
  },

  // check for web3 being used by browser, default to one on local server
  initWeb3: function() {
    if (typeof web3 != 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    // initiate contract after
    return App.initUserContract();
  }, 

  // initiate user contract from user.json 
  initUserContract: function() {
    $.getJSON('Users.json', function(data) {
      var UserArtifact = data;
      // use User.json as a artifact, and bind to current application
      App.contracts.User = TruffleContract(UserArtifact);
      App.contracts.User.setProvider(App.web3Provider);
      // bind all jQuery functionality onto user buttons
      return App.bindUserEvents();
    });
  },

  // do all binding of user events here
  bindUserEvents: function() {
    $(document).on('click', '.btn-primary', App.handleUserSignup);
  },

  handleUserSignup: function() {
    /* 
      add functionality afterwards
    */
    return;
  }
}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
