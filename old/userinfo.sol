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
    uint[] transfer_id_array;
    uint user_id = 1;
    uint land_transfer_id = 1;
    
    function getAllUserRecords () view public returns (uint[]) {
        return user_id_array;
    }
    
     function getAllTransferRecords () view public returns (uint[]) {
        return transfer_id_array;
    }
    
    function createUserRecord (string _user_fname, string _user_lname) view public returns (uint) {
        var newUserRecord = userRecords[user_id];
        newUserRecord.user_fname = _user_fname;
        newUserRecord.user_lname = _user_lname;
        uint curr_user_id = user_id;
        user_id += 1;
        return curr_user_id;
    }
    
    function createLandTransfer (uint PIN, string _seller_fname, string _seller_lname, string _buyer_fname, string _buyer_lname) view public returns (uint) {
        var newLandTranfer = landTransfers[land_transfer_id];
        uint _seller_id = createUserRecord(_seller_fname, _seller_lname);
        uint _buyer_id = createUserRecord(_seller_fname, _seller_lname);
        newLandTranfer.seller_id = _seller_id;
        newLandTranfer.buyer_id = _buyer_id;
        
        uint curr_land_transfer_id = land_transfer_id;
        return curr_land_transfer_id;
    }
}