pragma solidity ^0.4.18;

import "contracts/USERS.sol";

/*
    PURPOSE
    - Store and manage land parcel data

    [!] PENDING
    - security testing
    - integration testing
    - performance optimization
    - ? Solidity Template (cf. Users.sol)
    - verify atomicity of the two parcel structures

    - functions
        + merge_pins
        + split_pin
*/

contract PARCELS is USERS {

    struct ParcelRecord {

        /*  Existing Members

            init        is the structure initialized?
            ~c_owner
            ~prev_own   array of all previous owners
            ~ac_date
            ~deac_date

            [!] PENDING

            geographic locator
                + a unique property location identifier
                + (e.g. a lat-lon string)
                + likely bytes32
        */

        bool init;

        uint32 current_owner;
        uint32[] previous_owners;

        uint64 activation_date;
        uint64 deactivation_date;
    }

    //      (each parcel needs a unique ID)
    mapping(uint32 => ParcelRecord) master_parcel_list; 
    uint32[] pin_list;

    // mpbu = master_parcels_by_uid
    //      (maps user_id to an array of owned parcels)
    mapping(uint32 => uint32[]) mpbu;

    function create_parcel_record (uint32 _pin, uint32 _co) public onlyAdmin {

        require(!parcel_record_exists(_pin));

        master_parcel_list[_pin].current_owner = _co;
        master_parcel_list[_pin].init = true;

        pin_list.push(_pin);
        mpbu[_co].push(_pin);
    }
    
    function parcel_record_exists(uint32 pin) public view returns (bool) {
        return master_parcel_list[pin].init;
    }

    function get_parcel_record_from_pin (uint32 pin) public view returns (ParcelRecord) {
        return master_parcel_list[pin];
    }

    function get_parcel_record_from_pin_tuple (uint32 pin) public view returns (uint32) {
        return (master_parcel_list[pin].current_owner);
    }

    function return_current_owner_of_pin (uint32 pin) public view returns (uint32) {
        return master_parcel_list[pin].current_owner;
    }

    function does_user_own_pin(uint32 user_id, uint32 pin) public view returns(bool) {
        // [!] assumes the two mappings are synchronized
        if(master_parcel_list[pin].current_owner == user_id){
            return true;
        }
        return false;
    }

    function transfer_pin (uint32 _pin, uint32 _new_owner) internal {
        // [!] inef.
        // PRECONDITIONS
        //  0. [!] restrict callers: protect via pre-validation
        //  1. require(parcel_record_exists(_pin));
        // [!] handle "not found" errors

        // make it so _co no longer owns _pin
        uint32 _co = master_parcel_list[_pin].current_owner;
        master_parcel_list[_pin].previous_owners.push(_co);

        uint index;
        index = get_mpbu_index_from_pin(_co, _pin);
        delete mpbu[_co][index];

        // make it so new_owner owns _pin
        master_parcel_list[_pin].current_owner = _new_owner;
        mpbu[_new_owner].push(_pin);
    }

    function get_mpbu_index_from_pin(uint32 user_id, uint32 _pin) internal view returns (uint) {
        for(uint i = 0; i < mpbu[user_id].length; ++i) {
            if(mpbu[user_id][i] == _pin){
                return i;
            }
        }

        // we should always find the index
        assert(false);
    }

    //Use like: "remove_mpbu_element_by_index(_co, index);"
    function remove_mpbu_element_by_index(uint32 user_id, uint index) internal {
        uint L = mpbu[user_id].length - 1;
        mpbu[user_id][index] = mpbu[user_id][L];
        delete mpbu[user_id][L];
        mpbu[user_id].length--;
    }

    function get_list_owners_by_pin(uint32 pin) public view returns(uint32[]) {
        return master_parcel_list[pin].previous_owners;
    }
} 
