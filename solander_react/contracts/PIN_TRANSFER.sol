pragma solidity ^0.4.18;

import "contracts/USERS.sol";
import "contracts/PARCELS.sol";

/*
    PURPOSE
    - Facilitate land transfers

    [!] PENDING
    - security testing
    - integration testing
    - performance optimization

    - functions
        + merge_pins
        + split_pin
        + withdraw_land_transfer_request

    - high volume test
    - money transfer
        + security
*/

contract PIN_TRANSFER is USERS, PARCELS {

    struct PinTransferRequest { 

        /*  Existing Members

            init        is the structure initialized?
            pin         Parcel Identification Number (PIN)
            ~wei_price
                + amount buyer must pay to seller for title
                + can be the full property sale price
                + can be zero, and money is transfered elsewhere
            ~s_eth_add  account into which money should be paid
            seller_id   ID of seller UserRecord
            buyer_id
            ~sl_id      derived from seller UserRecord
            ~bl_id
            ~b_approve  _____ approves transfer
            ~sl_approve 
            ~bl_approve 
            ~rf_pay
                + is the contract ready to receive payment?
                + should only be true if all approvals have been received
                + once the money is sent, the transfer will execute

            [!] PENDING

            expiration_time
                + for security
        */

        bool init;

        uint32 pin;
        uint256 sale_price_in_wei;
        address seller_ethereum_address;

        uint32 seller_id;
        uint32 buyer_id;

        uint32 seller_lawyer_id;
        uint32 buyer_lawyer_id;

        bool buyer_approves;
        bool seller_lawyer_approves;
        bool buyer_lawyer_approves;

        bool ready_for_payment;
    }

    // pptr = pending_pin_transfer_requests
    //      (one active request per PIN)
    mapping(uint32 => PinTransferRequest) pptr;
    uint32[] pptr_list; 
    uint32[] buyer_id_list;

    function create_pin_transfer_request(uint32 _buyer_id, uint256 _sale_price_in_wei, uint32 _pin) public {
    
        // PRE-CONDITIONS

        //  0. pin must exist
        require(PARCELS.parcel_record_exists(_pin));

        //  1. seller must own the given property
        uint32 _seller_id = PARCELS.return_current_owner_of_pin(_pin);

        //  2. message sender must be the "seller"
        require(USERS.is_equal_user_ethereum_address_and_input(_seller_id, msg.sender));

        //  3. no active requests for this property
        require(pptr[_pin].init == false);

        //  4. assume that each user always has a valid lawyer
        //      - guaranteed by USERS.create_user_record

        pptr[_pin] = PinTransferRequest({

            init: true,

            pin: _pin,
            sale_price_in_wei: _sale_price_in_wei,
            seller_ethereum_address: msg.sender,

            seller_id: _seller_id,
            buyer_id: _buyer_id,

            seller_lawyer_id: USERS.return_lawyer_of_user(_seller_id),
            buyer_lawyer_id: USERS.return_lawyer_of_user(_buyer_id),

            buyer_approves: false,
            seller_lawyer_approves: false,
            buyer_lawyer_approves: false,

            ready_for_payment: false
        });
    }

    function create_pin_transfer_request_test (uint32 _buyer_id, uint256 _sale_price_in_wei, uint32 _pin) public {
    
        // PRE-CONDITIONS

        //  0. pin must exist
        //require(PARCELS.parcel_record_exists(_pin));

        //  1. seller must own the given property
        uint32 _seller_id = PARCELS.return_current_owner_of_pin(_pin);

        //  2. message sender must be the "seller"
        //require(USERS.is_equal_user_ethereum_address_and_input(_seller_id, msg.sender));

        //  3. no active requests for this property
        //require(pptr[_pin].init == false);

        //  4. assume that each user always has a valid lawyer
        //      - guaranteed by USERS.create_user_record

        pptr_list.push(_pin);
        buyer_id_list.push(_buyer_id);

        pptr[_pin] = PinTransferRequest({

            init: true,

            pin: _pin,
            sale_price_in_wei: _sale_price_in_wei,
            seller_ethereum_address: msg.sender,

            seller_id: _seller_id,
            buyer_id: _buyer_id,

            seller_lawyer_id: USERS.return_lawyer_of_user(_seller_id),
            buyer_lawyer_id: USERS.return_lawyer_of_user(_buyer_id),

            buyer_approves: false,
            seller_lawyer_approves: false,
            buyer_lawyer_approves: false,

            ready_for_payment: false
        });

    }

    function add_approval(uint32 _pin) public {

        if(USERS.is_equal_user_ethereum_address_and_input(pptr[_pin].buyer_id, msg.sender)) {
            pptr[_pin].buyer_approves = true;
        }
        else if(USERS.is_equal_user_ethereum_address_and_input(pptr[_pin].seller_lawyer_id, msg.sender)) {
            pptr[_pin].seller_lawyer_approves = true;
        }
        else if(USERS.is_equal_user_ethereum_address_and_input(pptr[_pin].buyer_lawyer_id, msg.sender)) {
            pptr[_pin].buyer_lawyer_approves = true;
        }
        else {
            return;
        }

        check_approvals(_pin);
    }

    function get_pptr_list () public view returns (uint32[]) {
        return pptr_list;
    }

    function get_pin_from_index (uint _index) public view returns (uint32) {
        return pptr_list[_index];
    }

    function get_buyer_list () public view returns (uint32[]) {
        return buyer_id_list;
    }

    function get_buyer_pptr (uint32 _buyer_id_cmp) public view returns (address, uint32) {

        for (uint32 i = 0; i < uint32(pptr_list.length); i++) {
            if(_buyer_id_cmp == get_buyer_id_from_pin(pptr_list[i])) {
                return (pptr[i].seller_ethereum_address, pptr[i].pin);
            }
        }
    }

    function get_buyer_id_from_pin (uint32 _pin) public view returns (uint32) {
        return pptr[_pin].buyer_id;    
    } 

    function get_pptr_info (uint32 _pin) public view returns (uint32, address, uint32) {
        return (pptr[_pin].buyer_id, pptr[_pin].seller_ethereum_address, pptr[_pin].pin);
    }

    function check_approvals(uint32 _pin) private {

        if  (
            pptr[_pin].buyer_approves
            &&  pptr[_pin].seller_lawyer_approves
            &&  pptr[_pin].buyer_lawyer_approves
            )
        {
            pptr[_pin].ready_for_payment = true;
        }
    }

    function execute_land_transfer(uint32 _pin) public payable {
        // [!] REQUIRES RIGOROUS SECURITY VALIDATION
        // [!] Unfinished

        uint32 _buyer_id = pptr[_pin].buyer_id;
        address _sea = pptr[_pin].seller_ethereum_address;
        uint256 spiw = pptr[_pin].sale_price_in_wei;

        require(pptr[_pin].ready_for_payment);
        require(USERS.is_equal_user_ethereum_address_and_input(_buyer_id, msg.sender));
        require(msg.value == spiw);
        require(msg.sender.balance >= spiw);

        // delete zeroes all elements of the transfer request
        delete pptr[_pin];

        // land transfer
        //  [!] external contract call: should it come at the end?
        //  [!] what if the pin transfer fails?
        PARCELS.transfer_pin(_pin, _buyer_id);

        // money transfer
        //  [!] what if money the transfer fails?
        _sea.transfer(spiw);
    }

    function execute_land_transfer_test (uint32 _pin) public payable {
        // [!] REQUIRES RIGOROUS SECURITY VALIDATION
        // [!] Unfinished

        uint32 _buyer_id = pptr[_pin].buyer_id;
        address _sea = pptr[_pin].seller_ethereum_address;
        //uint256 spiw = pptr[_pin].sale_price_in_wei;

        //require(pptr[_pin].ready_for_payment);
        //require(USERS.is_equal_user_ethereum_address_and_input(_buyer_id, msg.sender));
        //require(msg.value == spiw);
        //require(msg.sender.balance >= spiw);

        // delete zeroes all elements of the transfer request
        delete pptr[_pin];

        // land transfer
        //  [!] external contract call: should it come at the end?
        //  [!] what if the pin transfer fails?
        PARCELS.transfer_pin(_pin, _buyer_id);

        // money transfer
        //  [!] what if money the transfer fails?
        //_sea.transfer(spiw);
    }


    function is_pin_transfer_request_active(uint32 _pin) public view returns(bool) {
        return pptr[_pin].init;
    }

    function is_pin_transfer_ready_for_payment(uint32 _pin) public view returns(bool) {
        return pptr[_pin].ready_for_payment;
    }

}
