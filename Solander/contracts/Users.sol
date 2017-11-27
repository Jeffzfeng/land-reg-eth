pragma solidity ^0.4.18;

contract Users {

    struct userInfo{
        string fname;
        string lname;
        string bdate;
    }

    // Every user is uniquely identified by a SIN_hash
    mapping(uint32 => userInfo) userRecords;    
    
    function createUserRecord (string _fname, string _lname, uint32 SIN_hash, string _bdate) public returns (bool) {
        var userRecord = userRecords[SIN_hash];
        userRecord.fname = _fname;
        userRecord.lname = _lname;
        userRecord.bdate = _bdate;
        return true;
    }
    
    function getUserRecord (uint32 SIN_hash) public view returns (string, string, string) {
        var userRecord = userRecords[SIN_hash];
        return (userRecord.fname, userRecord.lname, userRecord.bdate);
    }

}
