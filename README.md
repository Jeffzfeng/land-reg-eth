# README #
I am jeff, read me
This is the starter code for our solander system.
This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

Ubuntu 16.04 LTS

###### Running Truffle ######
1) * npm install -g truffle
2) * Truffle init
(steps 1 and 2 only need to be done for initial creation of project)

3) * Truffle compile
 - 	Recompile needed when contracts are changed

4) ensure that all truffle configurations are set correctly in the truffle.js file, similar to below:

truffle.js file should contain the following before running truffle migrate:
	module.exports = {
   		networks: {
   			development: {
   				host: "localhost",
   				port: 8545,
   				network_id: "*" // Match any network id
  			}
 		}
	};
*
5) ensure that an ethereum test environment is running on the background (I recommend using testRPC for now)

6) * Truffle migrate
 - this runs the JS files under migrations/x_migrations.js 
 - deploys the contract onto the testRPC environment 
 - updates the current blockchain environment as well if any changes are made due to compilation
 
7) * Truffle test 
 - Two types of tests can be written for test different aspect of the functionality, both are found under ./test
 -  Javascript tests:
 -   Tests for iteraction between user interface and contracts (good for scenario testing)
 -  Solidity tests:
 -   Tests for bare functionality of contracts itself (unit testing)
	
 Can be ran with "truffle test", after ensuring that it is running on blockchain and all migrations have been ran

8) * Iteractive terminal for manual testing
 - Either run "truffle console" or "truffle develop"
 - Truffle console needs a seperate ethereum environment to be ran in the background, 
   whereas truffle develop uses its own test environment.
 - You can treat this as basically the node terminal without the need of compiling and deploying.
 - All web3 libraries are already built in and can be ran, and the contracts are already deployed.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### 

### Extra resources ###
Read through for extra reference at truffle framework official site:
http://truffleframework.com/docs/getting_started/console 
