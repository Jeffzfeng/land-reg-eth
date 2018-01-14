pragma solidity ^0.4.18;

contract Users {

    struct userInfo{
        string fname;
        string lname;
        string bdate;
        bool init;
    }
    
    // an array which holds all the current ids of userRecords, can iterate and find all users with this array
    uint32[] userRecord_ids;
    
    // Every user is uniquely identified by a user_id (SIN_hash)
    mapping(uint32 => userInfo) userRecords;    
    
    function returnContractAddress () public view returns (address) {
        return address(this);
    }
    
    function getAllUserRecordsIDs () public view returns (uint32[]) {
        return userRecord_ids;
    }
    
    function getNumberOfUserRecords () public view returns (uint) {
        userRecord_ids.length;
    }
    
    function createUserRecord (string _fname, string _lname, uint32 user_id, string _bdate) public returns (bool) {
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
    
    function getUserRecord_fromID (uint32 user_id) public view returns (string, string, string) {
        var userRecord = userRecords[user_id];
        return (userRecord.fname, userRecord.lname, userRecord.bdate);
    }
}
