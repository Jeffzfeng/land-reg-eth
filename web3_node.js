To be typed into console (">" for node.js prompt, "$" for cmd line prompt)
//Need node.js, npm, solc, and web3 installed 
$ node
// SETUP	
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// COMPLIATION 
code = fs.readFileSync('Solander.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
// DEPLOYMENT
abiDefinition = JSON.parse(compiledCode.contracts[':Solander'].interface)
byteCode = compiledCode.contracts[':Solander'].bytecode
solanderContract = web3.eth.contract(abiDefinition)
deployedContract = solanderContract.new({data: byteCode, from: web3.eth.accounts[0] , gas: 4700000})
deployedContract.address
contractInstance = solanderContract.at(deployedContract.address)

//useful functions to test
//contract calls
contractInstance.createUserRecord('Jeff','Feng', {from: web3.eth.accounts[0]})
contractInstance.getAllUserRecords()
contractInstnace.getUserRecord(1)

//web3 functions
//check balance, in BigNumber, use console.log to parse
var balance = web3.eth.getBalance(web3.eth.accounts[0])
console.log(balance.toNumber())
//NEW web3 1.0.0 version -- not very stable
//solanderContract = new web3.eth.Contract(abiDefinition, '0x51c4a24599da345cf2572a35310b1507bed16de4'
//{data: byteCode, from:'0x2Aa49E52C54dCfFb7dB36a0BA9eB48F72c68E6DE', web3.eth.accounts[0], gas: 4700000})
// INTERACTION (once deployed)
// > contractInstance.totalVotesFor.call('Rama')
// { [String: '0'] s: 1, e: 0, c: [ 0 ] }
// > contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
// '0xdedc7ae544c3dde74ab5a0b07422c5a51b5240603d31074f5b75c0ebc786bf53'
// > contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
// '0x02c054d238038d68b65d55770fabfca592a5cf6590229ab91bbe7cd72da46de9'
// > contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
// '0x3da069a09577514f2baaa11bc3015a16edf26aad28dffbcd126bde2e71f2b76f'
// > contractInstance.totalVotesFor.call('Rama').toLocaleString()
// '3'