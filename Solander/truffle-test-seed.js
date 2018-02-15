Users = artifacts.require("Users");

module.exports = function(callback) {
  // perform actions 
  //console.log(Users.deployed).then(inst=> inst.createUserRecord.sendTransaction("Jeff", "Feng", 1, "01/01/2018")))
  let first_user = Users.deployed().then(inst=> inst.createUserRecord.sendTransaction("Jeff", "Feng", 1, "01/01/2018"))
  first_user.then(function(result){
      console.log(result)
  })

  let get_first_user = Users.deployed().then(inst=> inst.getUserRecord_fromID.call(1))
  get_first_user.then(function(result){
      console.log(result)
  })
}
