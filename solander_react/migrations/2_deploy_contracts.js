var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var LandTransfer = artifacts.require("./LandTransfers.sol");
var Users = artifacts.require("./Users.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(LandTransfer);
  deployer.deploy(Users);

};
