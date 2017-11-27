//Test code for users
pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Users.sol";

contract TestUsers {

	//mapping(uint32 => userInfoResult) userRecordResult; 

	Users users = Users(DeployedAddresses.Users());
	
	function testCreateUserRecord() {
		bool returnedResult = users.createUserRecord('Girija', 'Khandekar', 123, 'Sept21');
		bool expected_result = true;

		Assert.equal(returnedResult, expected_result, "Girija should be created as a user.");
	}


}
