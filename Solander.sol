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
        string date_created;
        // boolean value to indicate active/inactiveness
        bool active;
        // can be to array of dates
        uint128[] points;
    } 
    
    /*
    
    */
    struct landTransferInfo{
        uint32 PIN_hash;
        uint32 seller_SIN_hash;
        uint32 buyer_SIN_hash;
        string transfer_date;
    }
    
    /* 
        This struct holds all the information that pertains to a user:
            fname -> user's first name
            lname -> user's last name
            land_owned -> an array of integers of all PINS owned by this particular user
    */
    struct userInfo{
        string fname;
        string lname;
        string bdate;
        uint32 lawyer_pkey;
        uint32 user_pkey;
        address wallet;
        uint32[] land_owned;
    }
    
    // Every piece of land is uniquely identified by a PIN_hash
    mapping(uint32 => landInfo) landRecords;
    
    // Every user is uniquely identified by a SIN_hash
    mapping(uint32 => userInfo) userRecords;    
    
    // Every transfer is uniquely identified with a transfer_id (a combination of the hash of the timestamp - seller/buyer SIN and PIN)
    mapping(uint64 => landTransferInfo) landTransferRecords;
    
    function newLandRecord (string _date_created, uint32 PIN_hash) public returns (bool){
        var landRecord = landRecords[PIN_hash];
        landRecord.date_created = _date_created;
        return true;
    }
    
    function getLandRecord (uint32 PIN_hash) public view returns (bool, string, uint128[]) {
        var landRecord = landRecords[PIN_hash];
        return (landRecord.active, landRecord.date_created, landRecord.points);
    }
    
    function newUserRecord (string _fname, string _lname, uint32 SIN_hash, string _bdate) public returns (bool) {
        var userRecord = userRecords[SIN_hash];
        userRecord.fname = _fname;
        userRecord.lname = _lname;
        userRecord.bdate = _bdate;
        return true;
    }
    
    function updateCryptoInfo (address _wallet, uint32 _lawyer_pkey, uint32 _user_pkey, uint32 SIN_hash) public returns (bool) {
        var userRecord = userRecords[SIN_hash];
        userRecord.wallet = _wallet;
        userRecord.lawyer_pkey = _lawyer_pkey;
        userRecord.user_pkey = _user_pkey;
        return true;    
    }
    
    function getUserRecord (uint32 SIN_hash) public view returns (string, string, string, uint32, uint32, address, uint32[]) {
        var userRecord = userRecords[SIN_hash];
        return (userRecord.fname, userRecord.lname, userRecord.bdate, userRecord.lawyer_pkey, userRecord.user_pkey, userRecord.wallet, userRecord.land_owned);
    }
    
    function newLandTransfer (uint64 transfer_id, uint32 _PIN_hash, uint32 _seller_SIN_hash, uint32 _buyer_SIN_hash, string _transfer_date) public returns (bool) {
        var landTransferRecord = landTransferRecords[transfer_id];
        landTransferRecord.PIN_hash = _PIN_hash;
        landTransferRecord.seller_SIN_hash = _seller_SIN_hash;
        landTransferRecord.buyer_SIN_hash = _buyer_SIN_hash;
        landTransferRecord.transfer_date = _transfer_date;
        return true;
    }
    
    function getLandTransferRecord (uint64 transfer_id) public view returns (uint32, uint32, uint32, string) {
        var landTransferRecord = landTransferRecords[transfer_id];
        return (landTransferRecord.PIN_hash, landTransferRecord.seller_SIN_hash, landTransferRecord.buyer_SIN_hash, landTransferRecord.transfer_date);
    }
}
