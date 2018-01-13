pragma solidity ^0.4.18;

import "contracts/Users.sol";
    
contract LandTransfers {
    
    struct landTransferInfo{
        uint32 buyer_id;
        uint32 seller_id;
        bool init;
        // SIN in the future
        // other transfer details
    }
    
    // Every land parcel is uniquely identified by a PIN_hash
    mapping(uint32 => landTransferInfo) landTransfers;
    
    function getLandTransfer (uint32 PIN_hash) view public returns (uint32, uint32) {
        var userRecord = landTransfers[PIN_hash];
        return (userRecord.buyer_id, userRecord.seller_id);
    }
    
    function createLandTransfer (uint32 PIN_hash, uint32 _buyer_id, uint32 _seller_id) public returns (bool) {
        var newLandTransfer = landTransfers[PIN_hash];
        Users user = new Users();
        if(user.userRecordExists(_seller_id)){
            newLandTransfer.seller_id = _seller_id;
        }
        else{
            return false;
        }
        if(user.userRecordExists(_buyer_id)){
            newLandTransfer.buyer_id = _buyer_id;
        }
        else{
            return false;
        }
        newLandTransfer.init = true;
        return true;
    }
}
