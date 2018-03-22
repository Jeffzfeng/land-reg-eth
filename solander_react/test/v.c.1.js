const user_artifact = artifacts.require('./USERS.sol')

// owner is a list of testrpc accounts
contract('New user creation', async (accounts) => {

    user_con = user_artifact;

    beforeEach('setup user contract for each test', async function () {
        user_con = await user_artifact.new()
    })

    it('User creation', async function () {
    	let admin_acc = accounts[9];
    	user_con.set_admin({from: admin_acc});

    	// a user list with tin and a corresponding key which will be used as an additional security measure
		var users_list =
	    [
	        {'uid':1, 'name':"userA", 'tin':"31011905", 'key': '1', 'acc':accounts[0], 'is_lawyer': false, 'lawyer_uid':21},
	        {'uid':9, 'name':"userB", 'tin':"07061805", 'key': '2', 'acc':accounts[1], 'is_lawyer': false, 'lawyer_uid':29},
	        {'uid':21, 'name':"lawyerA", 'tin':"07071907", 'key': '3', 'acc':accounts[2], 'is_lawyer': true, 'lawyer_uid':0},
	        {'uid':29, 'name':"lawyerB", 'tin':"21091990", 'key': '4', 'acc':accounts[3], 'is_lawyer': true, 'lawyer_uid':0}
	    ];

	    // iterate through user list and create them
	    for(i = 0 ; i < users_list.length ; i++)
        {
            var user = users_list[i];

            // tin hash 1
            var offst_tin = user.tin + user.key;
            var tin_hsh = web3.sha3(offst_tin, {encoding: 'hex'});
            
            /*Create each user records and validate persistency*/
            await user_con.create_user_record(user.uid, user.name, tin_hsh, user.acc, user.is_lawyer, user.lawyer_uid, {from: admin_acc});
            let ret_user = await user_con.user_record_exists(user.uid);
            assert.equal(ret_user, true, user.name + " creation");
        }

        // iterate through the user list and confirm that the hash + key are no longer stored as plain text

        for(i = 0 ; i < users_list.length; i++)
        {
        	var user = users_list[i];
        	var tst_offst_tin = user.tin + user.key;
            let tst_hash_tin = await user_con.get_user_hash_from_uid(user.uid);
            let compare_tin_hash = (tst_hash_tin === tst_offst_tin) ? true : false;
        	assert.equal(compare_tin_hash, false, "tin value hash not been properly hashed");
        }

        // verifiy 

        for(i = 0 ; i < users_list.length; i++)
        {
        	var user = users_list[i];
        	var tst_offst_tin = user.tin + user.key;
        	var tst_hash_tin = web3.sha3(tst_offst_tin, {encoding: 'hex'});
        	let hash_tin = await user_con.get_user_hash_from_uid(user.uid);
        	assert.equal(hash_tin, tst_hash_tin, "tin can be rehashed to the value")
        }
	})
})