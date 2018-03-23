const pin_transfer = artifacts.require('./PIN_TRANSFER.sol')

// owner is a list of testrpc accounts
contract('PIN_TRANSFER', async (accounts) => {

    pt_con = pin_transfer;

    beforeEach('setup contract for each test', async function () {
        pt_con = await pin_transfer.new()
    })

    it('simple pin transfer', async function () {

        const cpts = async function (ev1, ev2, msg = "") {
            // cpts = check_pin_0_transfer_status
            // ev = expected_value

            let ret1 = await pt_con.is_pin_transfer_request_active(pin_0);
            assert.equal(Boolean(ret1), ev1, String(msg) + " ;is transfer active for pin: " + String(pin_0));

            let ret2 = await pt_con.is_pin_transfer_ready_for_payment(pin_0);
            assert.equal(Boolean(ret2), ev2, String(msg) + " ;is transfer payment-ready for pin: " + String(pin_0));
        }

        // set the Admin account
        let admin_acc = accounts[9];
        pt_con.set_admin({from: admin_acc});
        
        // USER CREATION
        // create two users, A and B, and two lawyers
        //  - lawyerA is userA's lawyer
        //  - lawyerB is userB's lawyer

        // use placeholders for TINs
        //  - secure TIN is not required for this test
        let pT = [0,1,2,3,4]

        // raw user data
        function js_user(_n, _pT, _a, _li, _uid, _iL) {
            this.name = _n;
            this.protected_TIN = _pT;
            this.account = _a;
            this.lawyer_id = _li;
            this.user_id = _uid;
            this.isLawyer = _iL;
        }
        
        var users =
        [
            new js_user("lawyerA", pT[1], accounts[1], 21, 21, true), 
            new js_user("_user_A", pT[2], accounts[2], 21, 1, false), 
            new js_user("lawyerB", pT[3], accounts[3], 29, 29, true), 
            new js_user("_user_B", pT[4], accounts[4], 29, 9, false) 
        ]

        let lawyerA_acc = users[0].account;
        let userA_acc   = users[1].account; 
        let lawyerB_acc = users[2].account;
        let userB_acc   = users[3].account;

        let lawyerA_uid = users[0].user_id;
        let userA_uid   = users[1].user_id; 
        let lawyerB_uid = users[2].user_id;
        let userB_uid   = users[3].user_id;

        // create user records; verify their persistence
        for(i = 0 ; i < users.length ; i++) {
            var x = users[i];
            await pt_con.create_user_record(
                x.name, 
                x.protected_TIN, 
                x.account,
                x.lawyer_id,
                x.user_id,
                x.isLawyer,
                {from: admin_acc}
            );
            let ret_user = await pt_con.user_record_exists(x.user_id);
            assert.equal(ret_user, true, x.name + " creation");
        }
        
        // ensure that a non-existent user is reported as such
        let fake_uid = 100;
        let ret_user_5 = await pt_con.user_record_exists(fake_uid)
        assert.equal(ret_user_5, false, "fake_uid UserRecord should NOT exist");

        // PIN CREATION
        // create two pins
        //  - pin_0 is for userA
        //  - pin_1 is for userB

        // raw pin data
        function js_pin(_p, _u) {
            this.pin = _p;
            this.uid = _u;
        }

        var pins =
        [
            new js_pin(99900, userA_uid),
            new js_pin(99955, userB_uid)
        ]

        let pin_0 = pins[0].pin;
        let pin_1 = pins[1].pin;

        // create pin records; verify their persistence
        for(i = 0 ; i < pins.length ; i++) {
            let x = pins[i];
            await pt_con.create_parcel_record(
                x.pin,
                x.uid,
                {from: admin_acc}
            );
            let ret_parcel = await pt_con.parcel_record_exists(x.pin);
            assert.equal(ret_parcel, true);
        }

        // ensure that a non-existent pin is reported as such
        let fake_pin = 100999;
        let ret_parcel_3 = await pt_con.parcel_record_exists(fake_pin);
        assert.equal(ret_parcel_3, false, "fake_pin ParcelRecord should NOT exist");

        // PIN TRANSFER REQUEST CREATION
        let sale_price_in_wei = 10000;
        await cpts(false, false, "immediately before pin_transfer_request is made");
        await pt_con.create_pin_transfer_request(userB_uid, sale_price_in_wei, pin_0, {from: userA_acc});
        await cpts(true,  false, "immediately after pin_transfer_request is made");

        // ensure the transfer has NOT yet occured
        let ret_ptr_1 = await pt_con.does_user_own_pin(userA_uid, pin_0);
        assert.equal(Boolean(ret_ptr_1), true, "userA should own pin_0");
        let ret_ptr_2 = await pt_con.does_user_own_pin(userB_uid, pin_0);
        assert.equal(Boolean(ret_ptr_2), false, "userB should NOT own pin_0");

        // approve the transfer
        await pt_con.add_approval(pin_0, {from: userB_acc});
        await cpts(true, false);

        await pt_con.add_approval(pin_0, {from: lawyerA_acc});
        await cpts(true, false);

        await pt_con.add_approval(pin_0, {from: userA_acc});
        await cpts(true, false, "userA_acc's approval should NOT allow the transfer to be approved");

        await pt_con.add_approval(pin_0, {from: lawyerB_acc});
        await cpts(true, true, "all approvals added; the transfer should be ready for payment");

        // send payment for the transfer
        await pt_con.execute_land_transfer(pin_0, {from: userB_acc, value: sale_price_in_wei});
        await cpts(false, false, "the money has been sent; transfer should execute");

        // ENSURE THE TRANSACTION OCCURED
        let ret_tf_1 = await pt_con.does_user_own_pin(userA_uid, pin_0);
        assert.equal(Boolean(ret_tf_1), false, "userA should NOT own pin_0");
        let ret_tf_2 = await pt_con.does_user_own_pin(userB_uid, pin_0);
        assert.equal(Boolean(ret_tf_2), true, "userB should own pin_0");
    })
})
