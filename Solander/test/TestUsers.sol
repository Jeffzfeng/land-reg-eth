//Test code for users
pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Users.sol";

contract TestUsers {

	//mapping(uint32 => userInfoResult) userRecordResult; 

	Users users = Users(DeployedAddresses.Users());
	
	function testCreateUserRecord() public {
		bool returnedResult = users.createUserRecord('Girija', 'Khandekar', 123, 'Sept21');
		bool expected_result = true;

		Assert.equal(returnedResult, expected_result, "Girija should be created as a user.");
	}

	function testgetUserID_fromIndex() public {
		uint32 userID_result = users.getUser_fromIndex(0);
		uint32 userID_expected = 123;
		Assert.equal(uint(userID_result), uint(userID_expected), "returned userID is incorrect");
	}

	function testuserRecordExists() public {
		bool expected_result = true;
		bool result = users.userRecordExists(123);
		Assert.equal(expected_result, result, "User doesnt exist");
	}

	function testgetUserRecord_fromID() public {
		bytes32 fname;
		bytes32 lname;
		bytes32 bday;
		(fname, lname, bday) = users.getUserRecord_fromID(123);
		bytes32 expected_fname = "Girija";
		Assert.equal(expected_fname, fname, "Girija doesnt exist");

	}

}
