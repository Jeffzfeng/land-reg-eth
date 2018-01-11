Users.deployed()

// sample test functions for Users
Users.deployed().then(inst=> inst.initUsers.call())
Users.deployed().then(inst=> inst.getUsers.call()).then(result => user = result)
user.toString()
// should return with 0
Users.deployed().then(inst=> inst.setUsers.sendTransaction(42))
Users.deployed().then(inst=> inst.getUsers.call()).then(result => user = result)
// should return with 42


// for creating records
Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("Jeff", "Feng", 1, "01/01/2018"))
Users.deployed().then(inst=> inst.getUserRecord.call(1))
Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("Perb", "Wong", 2, "01/01/2018"))
Users.deployed().then(inst=> inst.getUserRecord.call(2))
