
// for creating user records
Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("Jeff", "Feng", 1, "01/01/2018"))
Users.deployed().then(inst=> inst.getUserRecord_fromID.call(1))
Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("Perb", "Wong", 2, "01/01/2018"))
Users.deployed().then(inst=> inst.getUserRecord_fromID.call(2))
Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("Girija", "Khandekar", 3, "01/01/2018"))
Users.deployed().then(inst=> inst.getUserRecord_fromID.call(3))
Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("pra", "son", 4, "01/01/2018"))
Users.deployed().then(inst=> inst.getUserRecord_fromID.call(4))

// for creating a land transfer
LandTransfers.deployed().then(inst=> inst.createLandTransfer.sendTransaction(1,2,1)).then(result=> success = result)

// get back land transfer
LandTransfers.deployed().then(inst=> inst.getLandTransfer.call(1)).then(results_array=> transferRecord = results_array)