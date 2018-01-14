pragma solidity ^0.4.18;

contract Users {

    struct userInfo{
        bytes32 fname;
        bytes32 lname;
        bytes32 bdate;
        bool init;
    }
    
    // an array which holds all the current ids of userRecords, can iterate and find all users with this array
    uint32[] userRecord_ids;
    
    // Every user is uniquely identified by a user_id (SIN_hash)
    mapping(uint32 => userInfo) userRecords;    
    
    function returnContractAddress () public view returns (address) {
        return address(this);
    }
    
    function getUser_fromIndex (uint index) public view returns (uint32) {
        return userRecord_ids[index];
    }
    
    function getNumberOfUserRecords () public view returns (uint) {
        userRecord_ids.length;
    }
    
    function createUserRecord (bytes32 _fname, bytes32 _lname, uint32 user_id, bytes32 _bdate) public returns (bool) {
        var userRecord = userRecords[user_id];
        userRecord.fname = _fname;
        userRecord.lname = _lname;
        userRecord.bdate = _bdate;
        userRecord_ids.push(user_id);
        userRecord.init = true;
        return true;
    }
    
    function userRecordExists(uint32 user_id) public view returns (bool) {
        var userRecord = userRecords[user_id];
        if(userRecord.init == true){
            return true;
        }
        else{
            return false;
        }
    }
    
    function getUserRecord_fromID (uint32 user_id) public view returns (bytes32, bytes32, bytes32) {
        var userRecord = userRecords[user_id];
        return (userRecord.fname, userRecord.lname, userRecord.bdate);
    }
}
