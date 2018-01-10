Users.deployed()

Users.deployed()
.then(inst => 
  inst.createUsers.call())
.then(userID => 
  returnID = userID)
.then(print_result =>
  console.log(print_result.toString()))

