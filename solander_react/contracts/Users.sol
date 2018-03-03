pragma solidity ^0.4.18;

contract Users {
    struct userInfo {
        uint32[] ownedProperties;
        uint32 lawyerID;
        bytes32 firstName;
        bytes32 lastName;
        bytes32 birthDate;
        address ethereumAddress;

    }

    mapping(uint32 => userInfo) userRecords;

    function get_lawyer_ID(uint32 _userID ) public view returns (uint32) {
        return userRecords[_userID].lawyerID;
    }

    function create_user_record (bytes32 _firstName, bytes32 _lastName, uint32 _userID, bytes32 _birthDate) public returns (bool) {
        var userRecord = userRecords[_userID];
        userRecord.firstName = _firstName;
        userRecord.lastName = _lastName;
        userRecord.birthDate = _birthDate;
        //userRecord.push(_userID);
        //userRecord.init = true;
        return true;
    }

    function get_user_record (uint32 _userID) public view returns (bytes32, bytes32, bytes32) {
        var userRecord = userRecords[_userID];
        return (userRecord.firstName, userRecord.lastName, userRecord.birthDate);
    }
}