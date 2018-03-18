var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var LandTransfer = artifacts.require("./LandTransfers.sol");
var Users = artifacts.require("./Users.sol");

var deployed_users_contract = artifacts.require("USERS");
var deployed_parcels_contract = artifacts.require("PARCELS");
var deployed_pin_transfer_contract = artifacts.require("PIN_TRANSFER");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(LandTransfer);
    deployer.deploy(Users);

    deployer.deploy(deployed_users_contract);
    deployer.deploy(deployed_parcels_contract);
    deployer.deploy(deployed_pin_transfer_contract);
};
