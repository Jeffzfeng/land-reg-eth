# README #
I am jeff, read me
This is the starter code for our solander system.
This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

Ubuntu 16.04 LTS

### Running Truffle
* npm install -g truffle
* Truffle init
* Truffle compile
	
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

* Truffle migrate
* Truffle test

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
