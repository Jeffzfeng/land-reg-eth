pragma solidity ^0.4.18;
    
contract LandTransfers {
    
    struct landTransferInfo{
        uint buyer_id;
        uint seller_id;
        uint PIN;
        // SIN in the future
        // other transfer details
    }
    
    mapping(uint => landTransferInfo) landTransfers;
    
    //holds all transfer_ids
    uint[] transfer_id_array;
    uint land_transfer_id = 1;
    
    function getAllLandTransferRecords () view public returns (uint[]) {
        return transfer_id_array;
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