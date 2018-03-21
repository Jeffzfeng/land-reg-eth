const pin_transfer = artifacts.require('./PIN_TRANSFER.sol')

// owner is a list of testrpc accounts
contract('PIN_TRANSFER', async (accounts) => {

    pt_con = pin_transfer;

    beforeEach('setup contract for each test', async function () {
        pt_con = await pin_transfer.new()
    })

    it('simple pin transfer', async function () {

        const cp1ts = async function (ev1, ev2, msg = "") {
            // cpts = check_pin_1_transfer_status
            // ev = expected_value

            let ret1 = await pt_con.is_pin_transfer_request_active(pin_1);
            assert.equal(Boolean(ret1), ev1, String(msg) + " ;is transfer active for pin: " + String(pin_1));

            let ret2 = await pt_con.is_pin_transfer_ready_for_payment(pin_1);
            assert.equal(Boolean(ret2), ev2, String(msg) + " ;is transfer payment-ready for pin: " + String(pin_1));
        }

        // set the Admin account
        let admin_acc = accounts[9];
        pt_con.set_admin({from: admin_acc});
        
        // create two users, A and B and two lawyers
        //  - lawyerA is userA's lawyer
        //  - lawyerB is userB's lawyer
        let userA_acc = accounts[0];
        let userB_acc = accounts[1];
        let lawyerA_acc = accounts[2];
        let lawyerB_acc = accounts[3];

        let uid_userA = 1;
        let uid_userB = 9;
        let uid_lawyerA = 21;
        let uid_lawyerB = 29;
        let fake_uid = 100;

        await pt_con.create_user_record(uid_userA, "userA", "1905-01-31", userA_acc, uid_lawyerA, {from: admin_acc});
        let ret_user_1 = await pt_con.user_record_exists(uid_userA);
        assert.equal(ret_user_1, true, "userA creation");

        await pt_con.create_user_record(uid_lawyerA, "lawyerA", "1805-01-31", lawyerA_acc, uid_lawyerB, {from: admin_acc});
        let ret_user_2 = await pt_con.user_record_exists(uid_lawyerA)
        assert.equal(ret_user_2, true, "lawyerA creation");

        await pt_con.create_user_record(uid_userB, "userB", "1960-03-07", userB_acc, uid_lawyerB, {from: admin_acc});
        let ret_user_3 = await pt_con.user_record_exists(uid_userB)
        assert.equal(ret_user_3, true, "userB creation");

        await pt_con.create_user_record(uid_lawyerB, "lawyerB", "1860-03-07", lawyerB_acc, uid_lawyerA, {from: admin_acc});
        let ret_user_4 = await pt_con.user_record_exists(uid_lawyerB)
        assert.equal(ret_user_4, true, "lawyerB creation");

        let ret_user_5 = await pt_con.user_record_exists(fake_uid)
        assert.equal(ret_user_5, false, "fake_uid UserRecord should NOT exist");
        
        // create a pin for each non-lawyer user
        let pin_1 = 99900;
        let pin_2 = 99955;
        let fake_pin = 100999;

        await pt_con.create_parcel_record(pin_1, uid_userA, {from: admin_acc});
        let ret_parcel_1 = await pt_con.parcel_record_exists(pin_1);
        assert.equal(ret_parcel_1, true);

        await pt_con.create_parcel_record(pin_2, uid_userB, {from: admin_acc});
        let ret_parcel_2 = await pt_con.parcel_record_exists(pin_2);
        assert.equal(ret_parcel_2, true);

        let ret_parcel_3 = await pt_con.parcel_record_exists(fake_pin);
        assert.equal(ret_parcel_3, false, "fake_pin ParcelRecord should NOT exist");

        // create pin transfer request
        let sale_price_in_wei = 10000;
        await cp1ts(false, false, "immediately before pin_transfer_request is made");
        await pt_con.create_pin_transfer_request(uid_userA, uid_userB, sale_price_in_wei, pin_1, userA_acc, {from: userA_acc});
        await cp1ts(true,  false, "immediately after pin_transfer_request is made");

        // ensure the transfer has NOT yet occured
        let ret_ptr_1 = await pt_con.does_user_own_pin(uid_userA, pin_1);
        assert.equal(Boolean(ret_ptr_1), true, "userA should own pin_1");
        let ret_ptr_2 = await pt_con.does_user_own_pin(uid_userB, pin_1);
        assert.equal(Boolean(ret_ptr_2), false, "userB should NOT own pin_1");

        // approve the transfer
        await pt_con.add_approval(pin_1, {from: userB_acc});
        await cp1ts(true, false);

        await pt_con.add_approval(pin_1, {from: lawyerA_acc});
        await cp1ts(true, false);

        await pt_con.add_approval(pin_1, {from: userA_acc});
        await cp1ts(true, false, "userA_acc's approval should NOT allow the transfer to be approved");

        await pt_con.add_approval(pin_1, {from: lawyerB_acc});
        await cp1ts(true, true, "all approvals added; the transfer should be ready for payment");

        // send payment for the transfer
        await pt_con.execute_land_transfer(pin_1, {from: userB_acc, value: sale_price_in_wei});
        await cp1ts(false, false, "the money has been sent; transfer should execute");

        // ensure the transfer occured
        let ret_tf_1 = await pt_con.does_user_own_pin(uid_userA, pin_1);
        assert.equal(Boolean(ret_tf_1), false, "userA should NOT own pin_1");
        let ret_tf_2 = await pt_con.does_user_own_pin(uid_userB, pin_1);
        assert.equal(Boolean(ret_tf_2), true, "userB should own pin_1");
    })
})
