// naming conventions 
// lower camelCase for struct
// plural lower camelCase for object
// snake_case for attributes 

pragma solidity ^0.4.18;


contract Solander {
    
    /*
        This struct holds all the information that pertains to a piece of land:
            dateCreated -> a string value in MM/DD/YYYY that indicates the creation of the piece of land (PIN)
            active -> indicates whether the piece of land is currently legally in use, PIN is archived otherwise
            points_array -> the lat/lon points which describe the dimensions of the piece of land
    */
    struct landInfo{
        // date stamp of when PIN was created
        string dateCreated;
        // boolean value to indicate active/inactiveness
        bool active;
        // can be to array of dates
        uint128 point1;
    } 
    
    struct landTransferInfo{
        
    }
    
    struct userInfo{
        string fname;
        string lname;
        uint32[] land_owned;
    }
    
    // Every piece of land is uniquely identified by a PIN (or a hash of the PIN)
    mapping(uint32 => landInfo) landRecords;
    
    // Every user is uniquely identified by a SIN (or a hash of the SIN)
    mapping(uint32 => userInfo) userRecords;    
    
    function newLandRecord (string _dateCreated, uint128 _point1, uint32 PIN) public returns (bool){
        var landRecord = landRecords[PIN];
        landRecord.dateCreated = _dateCreated;
        landRecord.point1 = _point1;
        return true;
    }
    
    function getLandRecord (uint32 PIN) public view returns (bool, string, uint128 point1) {
        var landRecord = landRecords[PIN];
        return (landRecord.active, landRecord.dateCreated, landRecord.point1);
    }
    
    function newUserRecord (string _fname, string _lname, uint32 SIN) public {
        var userRecord = userRecords[SIN];
        userRecord.fname = _fname;
        userRecord.lname = _lname;
    }
    
    function getUserRecord (uint32 SIN) public view returns (string, string, uint32[]) {
        var userRecord = userRecords[SIN];
        return (userRecord.fname, userRecord.lname, userRecord.land_owned);
    }
}
