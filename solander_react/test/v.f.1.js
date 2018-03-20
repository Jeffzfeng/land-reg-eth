const pin_transfer = artifacts.require('./PIN_TRANSFER.sol')

// owner is a list of testrpc accounts
contract('Store Ontario\'s Land Data', async (accounts) => {

    pt_con = pin_transfer;

    beforeEach('setup contract for each test', async function () {
        pt_con = await pin_transfer.new()
    })

    it('User and Pin creation', async function () {
        // create two users, A and B and two lawyers
        //  - lawyerA is userA's lawyer
        //  - lawyerB is userB's lawyer
        var users =
        [
            {'uid':1, 'name':"userA", 'bd':"31011905", 'acc':accounts[0], 'lawyer_uid':21},
            {'uid':9, 'name':"userB", 'bd':"07061805", 'acc':accounts[1], 'lawyer_uid':29},
            {'uid':21, 'name':"lawyerA", 'bd':"07071907", 'acc':accounts[2], 'lawyer_uid':29},
            {'uid':29, 'name':"lawyerB", 'bd':"21091990", 'acc':accounts[3], 'lawyer_uid':21}
        ];

        /*Create new user and verify persistency*/
        for(i = 0 ; i < users.length ; i++)
        {
            var user = users[i];
            /*Create each user records and validate persistency*/
            await pt_con.create_user_record(user.uid, user.name, user.bd, user.acc, user.lawyer_uid);
            let ret_user = await pt_con.user_record_exists(user.uid);
            assert.equal(ret_user, true, user.name + " creation");
        }

        var pins =
        [
            {'name':"pin1", 'num':99900, 'co':users.find(o => o.name === 'userA').uid},
            {'name':"pin2", 'num':99955, 'co':users.find(o => o.name === 'userB').uid}
        ]

        /*Create new pin and verify persistency*/
        for(i = 0 ; i < pins.length ; i++)
        {
            pin = pins[i];
            await pt_con.create_parcel_record(pin.num, pin.co);
            let ret_parcel = await pt_con.parcel_record_exists(pin.num);
            assert.equal(ret_parcel, true);
        }

        /*Fake user and Pin verrfication*/
        let fake_uid = 177;
        let ret_fake_uid = await pt_con.user_record_exists(fake_uid)
        assert.equal(ret_fake_uid, false, "fake_uid UserRecord should NOT exist");

        let fake_pin = 100999;
        let ret_fake_pin = await pt_con.parcel_record_exists(fake_pin);
        assert.equal(ret_fake_pin, false, "fake_pin ParcelRecord should NOT exist");
    })
})
