var deployed_users_contract = artifacts.require("USERS");
var deployed_parcels_contract = artifacts.require("PARCELS");
var deployed_pin_transfer_contract = artifacts.require("PIN_TRANSFER");

module.exports = function(deployer) {

    deployer.deploy(deployed_users_contract);
    deployer.deploy(deployed_parcels_contract);
    deployer.deploy(deployed_pin_transfer_contract);
};
