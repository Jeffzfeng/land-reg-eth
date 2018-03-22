const pin_transfer = artifacts.require('./PIN_TRANSFER.sol')

// owner is a list of testrpc accounts
contract('PIN_TRANSFER', async (accounts) => {

    pt_con = pin_transfer;

    beforeEach('setup contract for each test', async function () {
        pt_con = await pin_transfer.new()
    })

    it('fradulent pin transfer attempt', async function () {

        // set the Admin account
        let admin_acc = accounts[9];
        pt_con.set_admin({from: admin_acc});
        
        // USER CREATION
        // create two users, A and B, and two lawyers
        //  - lawyerA is userA's lawyer
        //  - lawyerB is userB's lawyer

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

        // pin creation
        let pin_1 = 99900;

        await pt_con.create_parcel_record(pin_1, userA_uid, {from: admin_acc});
        let ret_parcel_1 = await pt_con.parcel_record_exists(pin_1);
        assert.equal(ret_parcel_1, true);

        // userB is attempting to transfer userA's property to themselves!
        let sale_price_in_wei = 10000;
        await pt_con.create_pin_transfer_request(userB_uid, sale_price_in_wei, pin_1, {from: userB_acc});

        // the test will pass if you use the line below instead
        //await pt_con.create_pin_transfer_request(userB_uid, sale_price_in_wei, pin_1, {from: userA_acc});
    })
})
