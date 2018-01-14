//Test code for users
pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LandTransfers.sol";


contract TestLandTransfers {

	LandTransfers land_transfers = LandTransfers(DeployedAddresses.LandTransfers());
	Users user = new Users();

	function testCreateLandTransfer_pass_case() public {
	
		bool expected_result = true;
		bool returnedResult1 = user.createUserRecord('user1', 'user1', 1, '1/1/18');
		Assert.equal(returnedResult1, expected_result, "user1 not created.");
		
		bool returnedResult2 = user.createUserRecord('user2', 'user2', 2, '1/1/18');
		Assert.equal(returnedResult2, expected_result, "user2 not created.");

		address user_address = user.returnContractAddress();
		bool landresult = land_transfers.createLandTransfer(user_address, 100000, 1, 2);
		Assert.equal(landresult, expected_result, "Land transfer from user1 to user2 not completed");
	}
	
	
	function testCreateLandTransfer_fail_case() public {
		
		bool expected_result = false;
		address user_address = user.returnContractAddress();
		bool landresult = land_transfers.createLandTransfer(user_address, 200000, 3, 4);
		Assert.equal(landresult, expected_result, "Land transfer should not have completed because users don't exist");

	}
	
	function testGetLandTransfer() public {
	
		uint32 buyer_id;
		uint32 seller_id;
		uint32 expected_buyer_id = 1;
		uint32 expected_seller_id = 2;
		(buyer_id, seller_id) = land_transfers.getLandTransfer_fromPIN(100000);
		Assert.equal(uint(buyer_id), uint(expected_buyer_id), "buyer_id not as expected");
		Assert.equal(uint(seller_id), uint(expected_seller_id), "seller_id not as expected");
	}
	
	function testGetPIN_fromIndex() public {

		uint32 PIN_result1 = land_transfers.getPIN_fromIndex(0);
		uint32 expected_first_PIN = 100000;
		Assert.equal(uint(PIN_result1), uint(expected_first_PIN), "first returned PIN in PIN_hash_array is not correct");
		
	}
}
