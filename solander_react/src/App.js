import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Signup from './Signup'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
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
      this.instantiateContract()
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
    this.simpleStorage = this.contract(SimpleStorageContract)
    this.simpleStorage.setProvider(this.state.web3.currentProvider)
    return this.setStorageValue('Jeff Feng')
  }
    // Declaring this for later so we can chain functions on SimpleStorage.
    
  setStorageValue(name) {
    var simpleStorageInstance

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

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Solander: A Blockchain Land Registry</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your react app works as expected!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Below will test your smart contracts</h2>
              <p>If your contracts compiled and migrated successfully, and you accept the transaction on the metamask plugin below; the stored value should be <strong>Jeff Feng (default)</strong></p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <h3>Stored value: {this.state.storageValue}</h3>
              <h2>Change stored value below</h2>
                <ul>
                 <li onClick={() => {this.setStorageValue('Girija K')}}>Girija K</li>
                 <li onClick={() => {this.setStorageValue('Perb WOONNNG')}}>Perb WOONNNG</li>
                 <li onClick={() => {this.setStorageValue('Prasoon J')}}>Prasoon J</li>
                 <li onClick={() => {this.setStorageValue('Jeff Feng')}}>Jeff Feng</li>
              </ul>
             <Signup />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
