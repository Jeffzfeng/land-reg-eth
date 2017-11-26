// naming conventions 
// lower camelCase for struct
// plural lower camelCase for object
// snake_case for attributes 
pragma solidity ^0.4.18;

contract Solander {
    
    struct landTransferData{
        uint buyer_id;
        uint seller_id;
        uint PIN;
        // SIN in the future
        // other transfer details
    }
    
    
    struct userRecordInfo {
        string user_fname; 
        string user_lname;
    }
    
    mapping(uint => landTransferData) landTransfers;
    mapping(uint => userRecordInfo) userRecords;
    
    //holds all user_ids
    uint[] user_id_array;
    //holds all transfer_ids
    uint[] land_transfer_id_array;
    uint user_id;
    uint land_transfer_id;    

    // constructor (default) no args
    function Solander () public {
        user_id = 1;
        land_transfer_id =1;
    }

    // free to call
    // returns array of user ids
    function getAllUserRecords () view public returns (uint[]) {
        return user_id_array;
    }
    
    //free to call
    // returns array of land transfer ids
    function getAllTransferRecords () view public returns (uint[]) {
        return land_transfer_id_array;
    }
    
    // costs ETH to call!!
    // function to create new user record for a given fname, lname
    function createUserRecord (string _user_fname, string _user_lname) public returns (uint) {
        var newUserRecord = userRecords[user_id];
        newUserRecord.user_fname = _user_fname;
        newUserRecord.user_lname = _user_lname;
        //uint curr_user_id = user_id;
        //user_id_array.push(user_id);
        user_id += 1;
        return user_id;
    }
    
    //returns fname, lname for a given user id
    function getUserRecord (uint _user_id) view public returns (string, string) {
        var resultUserRecord = userRecords[_user_id];
        return (resultUserRecord.user_fname, resultUserRecord.user_lname);
    }
    //  costs ETH to call!!
    // function to create a new land transfer for a given pin, and fname, lname (seller/buyer)
    function createLandTransfer (uint PIN, string _seller_fname, string _seller_lname, string _buyer_fname, string _buyer_lname) public returns (uint) {
        var newLandTranfer = landTransfers[land_transfer_id];
        uint _seller_id = createUserRecord(_seller_fname, _seller_lname);
        uint _buyer_id = createUserRecord(_buyer_fname, _buyer_lname);
        newLandTranfer.seller_id = _seller_id;
        newLandTranfer.buyer_id = _buyer_id;
        land_transfer_id_array.push(land_transfer_id);
        uint curr_land_transfer_id = land_transfer_id;
        return curr_land_transfer_id;
    }
}
