const pin_transfer = artifacts.require('./PIN_TRANSFER.sol')

// owner is a list of testrpc accounts
contract('PIN_TRANSFER', async (accounts) => {

    pt_con = pin_transfer;

    beforeEach('setup contract for each test', async function () {
        pt_con = await pin_transfer.new()
    })

    it('attempt user creation with non-admin user', async function () {

        // set the Admin account
        let admin_acc = accounts[9];
        pt_con.set_admin({from: admin_acc});
        
        // USER CREATION
        x = {
            name: "X",
            protected_TIN: "100",
            account: accounts[1],
            lawyer_id: "10",
            user_id: "10",
            isLawyer: true
        }

        await pt_con.create_user_record(
            x.name, 
            x.protected_TIN, 
            x.account,
            x.lawyer_id,
            x.user_id,
            x.isLawyer,
            {from: accounts[0]}


            // the test will pass if you use the line below instead
            //{from: admin_acc}
        );
        let ret_user = await pt_con.user_record_exists(x.user_id);
        assert.equal(ret_user, true, x.name + " creation");
    })
})
