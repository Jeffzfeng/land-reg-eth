var Users = artifacts.require("Users");
var LandTransfers = artifacts.require("LandTransfers")

module.exports = function(deployer) {
	deployer.deploy(Users);
	deployer.deploy(LandTransfers)
};
