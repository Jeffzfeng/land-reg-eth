pragma solidity ^0.4.18;

/*
    PURPOSE
    - Store and manage user data

    [!] PENDING
    - security testing
    - integration testing
    - performance optimization

    - functions
        + update_ethereum_address

*/

contract USERS {

    struct UserRecord {

        /*  Existing Members

            init        is the structure initialized?
            full_name   legal name
            birth_date  (or organization founding date)
            ~eth_add
            lawyer_id   user_id of lawyer

            [!] PENDING

            user_type   (e.g. verify that a user is a lawyer)
        */

        bool init;

        bytes32 full_name;
        bytes32 birth_date;

        address ethereum_address;
        uint32 lawyer_id;
    }
    
    function return_contract_address () public view returns (address) {
        return address(this);
    }

    // mul = master_user_list
    //      (each user needs a unique ID)
    mapping(uint32 => UserRecord) mul;
    mapping(address => uint32) eth_addr_to_uid;

    uint32[] user_id_list;

    function create_user_record (uint32 user_id, bytes32 _fn, bytes32 _bd, address _ea, uint32 _li) public {

        require(!user_record_exists(user_id));
        mul[user_id] = UserRecord({

            init: true,

            full_name: _fn,
            birth_date: _bd,

            ethereum_address: _ea,
            lawyer_id: _li
        });

        eth_addr_to_uid[_ea] = user_id;
        user_id_list.push(user_id);
    }

    function get_user_id_from_eth_addr (address _ea) public view returns (uint32) {    
        return eth_addr_to_uid[_ea];
    }
    
    function get_user_list_length () public view returns (uint256) {
        return user_id_list.length;
    }

    function get_user_record_from_user_id (uint32 user_id) public view returns (UserRecord) {
        return mul[user_id];
    }

    function get_user_record_from_user_id_tuple (uint32 user_id) public view returns (bytes32, bytes32, address, uint32) {
        return (mul[user_id].full_name, mul[user_id].birth_date, mul[user_id].ethereum_address, mul[user_id].lawyer_id);
    }

    function user_record_exists(uint32 user_id) public view returns (bool) {
        return mul[user_id].init;
    }

    function get_ethereum_address_from_user_id(uint32 user_id) public view returns (address) {
        return (mul[user_id].ethereum_address);
    }

    function return_lawyer_of_user(uint32 user_id) public view returns (uint32) {
        return mul[user_id].lawyer_id;
    }

    function is_equal_user_ethereum_address_and_input (uint32 user_id, address x) public view returns (bool) {
        return (mul[user_id].ethereum_address == x);
    }
} 
