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
        
    // an array which holds all the current ids of userRecords, can iterate and find all users with this array
    uint32[] PIN_hash_array;
    
    // Every land parcel is uniquely identified by a PIN_hash
    mapping(uint32 => landTransferInfo) landTransfers;
    
    function returnContractAddress () public view returns (address) {
        return address(this);
    }
    
    function getAllLandTransferPINs () public view returns (uint32[]) {
        return PIN_hash_array;
    }
    
    function getNumberOfLandTransfers () public view returns (uint) {
        return PIN_hash_array.length;
    }
    
    function getLandTransfer (uint32 PIN_hash) view public returns (uint32, uint32) {
        var userRecord = landTransfers[PIN_hash];
        return (userRecord.buyer_id, userRecord.seller_id);
    }
    
    function createLandTransfer (address userAddress, uint32 PIN_hash, uint32 _buyer_id, uint32 _seller_id) public returns (bool) {
        var newLandTransfer = landTransfers[PIN_hash];
        Users user = Users(userAddress);
        if(user.userRecordExists(_seller_id) == true){
            newLandTransfer.seller_id = _seller_id;
        }
        else{
            return false;
        }
        if(user.userRecordExists(_buyer_id) == true){
            newLandTransfer.buyer_id = _buyer_id;
        }
        else{
            return false;
        }
        newLandTransfer.init = true;
        PIN_hash_array.push(PIN_hash);
        return true;
    }
}
