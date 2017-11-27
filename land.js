To be typed into console (">" for node.js prompt, "$" for cmd line prompt)
//Need node.js, npm, solc, and web3 installed 
$ node
// SETUP	
Web3 = require('web3')
solc = require('solc')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// COMPLIATION 
code = fs.readFileSync('Solander.sol').toString()
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
//contractInstance.createUserRecord('Girija','Feng', {from: web3.eth.accounts[0]})
//contractInstance.getAllUserRecords()
//contractInstnace.getUserRecord(1)
contractInstance.createNewLand('06/03/1995', 1, 1,  {from: web3.eth.accounts[0]});
