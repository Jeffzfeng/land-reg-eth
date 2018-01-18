# SOLANDER README

## Development Guide

### Environment Setup
1. Create a VirtualBox VM using Ubuntu 16.04 LTS
2. `npm install -g truffle`
3. `truffle init`

### Running Truffle
1. `truffle compile`
    - Compile each time a contract is changed
    
2. Ensure that all Truffle configuration settings are set correctly in the truffle.js file. See an example below:

> truffle.js file should contain the following before running truffle migrate:  
> 	module.exports = {  
>  		networks: {  
>  			development: {  
>  				host: "localhost",  
>  				port: 8545,  
>  				network_id: "*" // Match any network id  
> 			}  
>		}  
>	};  

3. Ensure that an Ethereum test environment is running on the background
    - `truffle develop` creates an appropriate environment
    - testRPC also works

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

### Iteractive Terminal for Manual Testing
- `truffle console` needs a separate Ethereum environment running in the background
- `truffle develop` uses its own test environment
    - "You can treat this as basically the node terminal without the need of compiling and deploying"
    - All web3 libraries are already built in and can be run, and the contracts are already deployed.

## Extra resources
- Read through for extra reference at truffle framework official site:
    - http://truffleframework.com/docs/getting_started/console
    - [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)
    - Ethereum Dapp tutorial:
    - http://truffleframework.com/tutorials/pet-shop
    - test