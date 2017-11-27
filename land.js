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


// SEED 
// land data
contractInstance.newLandRecord('06/03/1995', 1, 44,  {from: web3.eth.accounts[0]});
contractInstance.newLandRecord('06/03/1997', 2, 73,  {from: web3.eth.accounts[0]});
contractInstance.newLandRecord('06/03/1998', 3, 89,  {from: web3.eth.accounts[0]});
contractInstance.newLandRecord('06/03/2000', 4, 90,  {from: web3.eth.accounts[0]});
// user data
contractInstance.newUserRecord('Jeff', 'Feng', 1,  {from: web3.eth.accounts[0]});
contractInstance.newUserRecord('Perb', 'Wong', 2,  {from: web3.eth.accounts[0]});
contractInstance.newUserRecord('G', 'K', 3,  {from: web3.eth.accounts[0]});
contractInstance.newUserRecord('Proud', 'Son', 4,  {from: web3.eth.accounts[0]});
// transfer data
contractInstance.newLandTransfer(1, 1, 1, 2, '11/20/2017', {from: web3.eth.accounts[0]});
contractInstance.newLandTransfer(2, 2, 1, 2, '11/21/2017', {from: web3.eth.accounts[0]});
contractInstance.newLandTransfer(3, 4, 3, 2, '11/22/2017', {from: web3.eth.accounts[0]});
contractInstance.newLandTransfer(4, 3, 2, 1, '11/22/2017', {from: web3.eth.accounts[0]});

