# SOLANDER README
last updated: 2018/02/20 by: Jeff
- included new table of contents
- added instructions on how to use start local frontend "section 4"
- added FAQ or just common problems that I encountered "section 5"

## Development Guide Table of Contents
1. environment setup
2. running truffle
    - for development purposes only
    - tl:dr of steps:
        - compile (if changes were made) 
        - start up a test environment (either truffle develop or testrpc)
        - migrate 
        - test (either truffle test or manual testing)
3. additional notes on manual testing
4. frotend deployment on a local web server
5. FAQ

### 1) Environment Setup
    - Create a VirtualBox VM using Ubuntu 16.04 LTS
2. `npm install -g truffle`
    - version 4.x.x or higher recommended
3. 'npm install' 
    - this will install all node dependancies in folder 
4. for using using smart contracts in your browser, metamask is needed.
    - install here: https://metamask.io/ 

### 2) Running Truffle
1. `truffle compile`
    - Compile each time a contract is changed
    
2. Ensure that all Truffle configuration settings are set correctly in the truffle.js file. See an example below:

> truffle.js file should contain the following before running truffle migrate:  
> 	module.exports = {  
>  		networks: {  
>  			development: {  
>  				host: "localhost",  
>  				port: 8545,  // default port for testRPC, change this the preferred test server of choice
>  				network_id: "*" // Match any network id  
> 			}  
>		}  
>	};  

3. Ensure that an Ethereum test environment is running on the background
    - `truffle develop` creates an appropriate environment (launched on localhost:9545 by default)
    - testRPC also works (launched on localhost:8545 by default)

4. `truffle migrate` 
    - Runs the JS files under migrations/x_migrations.js 
    - Deploys contracts onto the environment 
    - Updates the current environment if any changes were made due to compilation
 
5. `truffle test`
    - Runs Javascript and Solidity tests (listed under ./test)
    - Ensure that an Ethereum environment is active in the background and all migrations have been run
    - Javascript
        - Test iteraction between contracts and the user interface (e.g. scenario testing)
    - Solidity
        - Unit testing of contracts

### 3) Iteractive Terminal for Manual Testing
- `truffle console` needs a separate Ethereum environment running in the background
- `truffle develop` uses its own test environment
    - "You can treat this as basically the node terminal without the need of compiling and deploying"
    - All web3 libraries are already built in and can be run, and the contracts are already deployed.
    - example of cmd line interaction code can be found in 

### 4) How to deploy frontend on a local web browser
- Below are steps to deploy frontend onto your local web browser
- The react-box is used as the underpinning boilerplate code;
- as it provided a useable template to write modular code that reacts to new smart contract transactions as changes of state
    - make sure the environment is properly setup, if there are any issues, please refer back to section 1 or 5
- 1) setting up meta mask
    - a little fox icon should be on the top navbar of your browser
    - click on "restore from seed phrase"
    - run "truffle develop" in cmd line
        - use the mneonic provided as wallet seed: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat in metamask
        - set a password to anything you would like
        - click on "private network" in the top left corner
        - go to custom RPC, and use "http://127.0.0.1:9545" as network
        - open "private network" again and choose this newly added network
    - if done correctly, you should now see that you have ~99 ETH
- 2) deploy contracts onto blockchain
    - run "compile" and "migrate" as usual. *note: if you are running inside truffle develop you don't need the "truffle" keyword
- 3) deploy frontend to localhost
    - run "truffle run start", this runs the file "script/start"
    - if done correctly, you should see the web page and a popup with a new transaction request from metamask.
- 4) frontend testing
    - there is template for "Jest" added to test react code, but only has 1 test so far
    - run "npm run test" to run this script

### 5) FAQ
- Below are some common issues encountered
    - Metamask issues:
        - Q: Nothing is popping up!
            - A: most likely ports are not configured correctly, make sure that is sufficient ETH to complete transaction
        - Q: Transaction failed! incorrect nonce.
            - make sure to press reset at the bottom of custom RPC page, currently the network does not reset itself even when shutdown

## Extra resources
- Read through for extra reference at truffle framework official site:
    - http://truffleframework.com/docs/getting_started/console
    - [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)
    - Ethereum Dapp tutorial:
    - http://truffleframework.com/tutorials/pet-shop
    - test