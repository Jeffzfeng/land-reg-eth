pragma solidity ^0.4.18;

import "../contracts/Users.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestUsers{
    Users users = Users(DeployedAddresses.Users());
    function test_create_user_record() public {
        bool returnedResult = users.create_user_record('Girija', 'Khandekar', 123, '08/08/2018');
        bool expectedResult = true;
        Assert.equal(returnedResult, expectedResult, 'User created');
    }
}
