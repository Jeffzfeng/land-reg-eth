import React, { Component } from 'react'
//import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
//import LandTransferContract from '../../build/contracts/LandTransfers.json'
import UsersContract from '../../build/contracts/USERS.json'


import getWeb3 from '../utils/getWeb3'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../App.css'
//import Signup from './Signup'
import LandTransferTable from './LandTransferTable'

 const land_transfer_hash_test = {}
 
export default class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      storageValue: 0,
      totalLandTransfer: 0,
      web3: null
    }
  }
  
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    this.contract = require('truffle-contract')
    // FOR SIMPLE STORAGE TEST
    //this.simpleStorage = this.contract(SimpleStorageContract)
    //this.simpleStorage.setProvider(this.state.web3.currentProvider)
  
    // LAND TRANSFER
    //this.landTransfer = this.contract(LandTransferContract)
    //this.landTransfer.setProvider(this.state.web3.currentProvider)
    //return this.setStorageValue('Jeff Feng')
    //return this.createLandTransferHashmap()

    //Users
    this.Users = this.contract(UsersContract)
    this.Users.setProvider(this.state.web3.currentProvider)
    return this.loadUsers('Girija', 'Khandekar', '08/08/2018', 123)
  }
    // Declaring this for later so we can chain functions on SimpleStorage.
  loadUsers(firstName, lastName, birthDate, userID ){
      var usersInstance

      //Get accounts
      this.state.web3.eth.getAccounts((error, accounts) => {
          this.Users.deployed().then((instance) => {
              usersInstance = instance

              // Stores a given value, 5 by default.
              //return usersInstance.setString(this.state.web3.fromAscii(name), {from: accounts[0]})
              return usersInstance.create_user_record(
                  this.state.web3.fromAscii(firstName),
                  this.state.web3.fromAscii(lastName),
                  123,
                  this.state.web3.fromAscii(birthDate),
                  {from: accounts[0]})

          }).then((result) => {
              // Get the value from the contract to prove it worked.
              console.log(result)
              //var userRecord =
              return usersInstance.get_user_record(123)//all(accounts[0])
              //return userRecord
              //return usersInstance.getString.call(accounts[0])

          }).then((result) => {
              console.log(result)
              console.log(result[0])
              console.log(result[1])
              console.log(this.state.web3.toAscii(result[0]))
              console.log(this.state.web3.toAscii(result[1]))

      // Update state with the result.
              //return this.setState({ storageValue: this.state.web3.toAscii(result) })
          })
      })



  }
  setStorageValue(name) {
    var simpleStorageInstance
      this.state.web3.eth.getAccounts((error, accounts) => {
          this.simpleStorage.deployed().then((instance) => {
              simpleStorageInstance = instance

              // Stores a given value, 5 by default.
              return simpleStorageInstance.setString(this.state.web3.fromAscii(name), {from: accounts[0]})
          }).then((result) => {
              // Get the value from the contract to prove it worked.
              return simpleStorageInstance.getString.call(accounts[0])
          }).then((result) => {
              // Update state with the result.
              return this.setState({ storageValue: this.state.web3.toAscii(result) })
          })
      })

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.setString(this.state.web3.fromAscii(name), {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.getString.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: this.state.web3.toAscii(result) })
      })
    })
  }

  createLandTransferHashmap() {
    var landTransferInstance
    var pinMappingLen

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.landTransfer.deployed().then((instance) => {
        landTransferInstance = instance
        landTransferInstance.createLandTransfer(5,3,4,5, {from: accounts[0]})
        landTransferInstance.createLandTransfer(10,4,5,7, {from: accounts[0]})
        landTransferInstance.createLandTransfer(123,3,7,8, {from: accounts[0]})
        return landTransferInstance.createLandTransfer(4,2,8,9, {from: accounts[0]})
      }).then(() => {
        
        // first, get number of PINs
        return landTransferInstance.getNumLandTransfers()
      }).then((result) => {
        pinMappingLen = result.c[0]

        // set this number as the new state
        return this.setState({totalLandTransfer: result.c[0]})
      }).then(() => {
        // iterate through pin map and 
        var promiseChain = []
        for (var i=0; i<pinMappingLen; i++){
          var next_pin = landTransferInstance.getPIN(i)
          promiseChain.push(next_pin)
        }
        Promise.all(promiseChain).then((result) => {
          var promiseChainNew = []
          for (var i=0; i<result.length; i++){
            //console.log(result[j].c[0])
            var PIN = result[i].c[0]
            land_transfer_hash_test[PIN] = {}
            land_transfer_hash_test[PIN]["PIN"] = PIN
            var landTransferStruct = landTransferInstance.getLandTransfer(PIN)
            //console.log(land_transfer_hash_test)
            //console.log(landTransferStruct)
            promiseChainNew.push(landTransferStruct)
          }
          Promise.all(promiseChainNew).then((result) => {
            console.log(result)
          }) 
        })
      })
    })
  }
  
  render() {
    return (
      <div className="Home">

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your react app works as expected!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Below will test your smart contracts</h2>
              <p>If your contracts compiled and migrated successfully, and you accept the transaction on the metamask plugin below; the stored value should be <strong>Jeff Feng (default)</strong></p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <h3>Stored value: {this.state.storageValue}</h3>

              <h1>Demo of how land transfer will work</h1>
              <p>Below is list of land that is available for a transfer request</p>
              <p>click on a name below, and choose the property to queue a request!</p>
              <LandTransferTable land_transfer_hash={land_transfer_hash_test}/>
              <p>Number of registered land: {this.state.totalLandTransfer}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}