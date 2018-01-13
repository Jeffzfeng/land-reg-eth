//Test code for users
pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LandTransfers.sol";


contract TestLandTransfers {

	LandTransfers land_transfers = LandTransfers(DeployedAddresses.LandTransfers());
	
	function testCreateLandTransfer_pass_case() public {
		Users user = new Users();
		bool expected_result = true;
		bool returnedResult1 = user.createUserRecord('user1', 'user1', 1, '1/1/18');
		Assert.equal(returnedResult1, expected_result, "user1 not created.");
		
		bool returnedResult2 = user.createUserRecord('user2', 'user2', 2, '1/1/18');
		Assert.equal(returnedResult2, expected_result, "user2 not created.");

		address user_address = user.returnContractAddress();
		bool landresult = land_transfers.createLandTransfer(user_address, 1, 1, 2);
		Assert.equal(landresult, expected_result, "Land transfer from user1 to user2 not completed");

	}
	
	
	function testCreateLandTransfer_fail_case() public {
		Users user = new Users();
		bool expected_result = false;
		
		address user_address = user.returnContractAddress();
		bool landresult = land_transfers.createLandTransfer(user_address, 1, 1, 2);
		Assert.equal(landresult, expected_result, "Land transfer should not have completed because users don't exist");

	}
	
}
