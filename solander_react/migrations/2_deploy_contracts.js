var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var LandTransfer = artifacts.require("./LandTransfers.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(LandTransfer);
};
