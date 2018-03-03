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

    function test_get_user_record() public {
        bytes32 fname;
        bytes32 lname;
        bytes32 bday;
        (fname, lname, bday) = users.get_user_record(123);
        bytes32 _fname = 'Girija';
        Assert.equal(fname, _fname, 'Girija created');
    }
}
