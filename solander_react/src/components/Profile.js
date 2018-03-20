import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import UsersContract from '../../build/contracts/USERS.json'

export default class Profile extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            user: null,
            contract: null,
            firstName: '',
            birthDate: '',
            ethereumAddress: null,
            lawyerID: null,
            ownedPINs: [],
            web3: null
        };
        
    }

    componentWillMount() {
        
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          })

          // Instantiate contract once web3 provided.
          this.instantiateContract()
        })
        .catch(() => {
          console.log('Error finding web3. or contract instantiation failed')
        })
    }

    instantiateContract() {
        // initiating contract for register page
        this.setState({contract: require('truffle-contract')})
        this.setState({user: this.state.contract(UsersContract)})
        this.state.user.setProvider(this.state.web3.currentProvider)
        console.log('User contract called by Register component')
        console.log("state of user contract: ", this.state.user)
        return this.handleProfilePage()
    }

    handleProfilePage(){
	  var userInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.user.deployed().then((instance) => {
            userInstance = instance
            console.log("current ethereum account: ",accounts)
            console.log("in handleProfilePage")
            return userInstance.get_user_id_from_eth_addr(accounts[0])
         }).then((result) => {
         	return userInstance.get_user_record_from_user_id_tuple(result)
         }).then((result) => {

	          // remove insignificant trailing zeroes
	          var asc_fullname = result[0].replace(/0+$/g, "")
	          var asc_bdate = result[1].replace(/0+$/g, "")

	          // // convert to ASCII
	          var fullname = this.state.web3.toAscii(asc_fullname)
	          var bdate = this.state.web3.toAscii(asc_bdate)
            var eth_address = result[2]
            var lawyer_id = result[3].c[0]

           //  // print for testing
         	  console.log(fullname)
         	  console.log(bdate)
            console.log(lawyer_id)
            console.log(eth_address)
         	  this.setState({firstName: fullname})
            this.setState({birthDate: bdate})
            this.setState({ethereumAddress: eth_address})
            this.setState({lawyerID: lawyer_id})
         })
      })
    }

  render() {
    return (
    	<div className="profile">
   			<h2>Welcome Back, {this.state.firstName}</h2>
        <p>
           Birthdate:
          <div className="profile-field">{this.state.birthDate}</div>
        </p>
        <p>
           LawyerID:
          <div className="profile-field">{this.state.lawyerID}</div>
        </p>
        <p>
           Eth Wallet Address:
          <div className="profile-field">{this.state.ethereumAddress}</div>
        </p>
        <p>PIN owned: {this.state.pinList} </p>
        <p>Pending Transfers: {this.state.pendingTransfers} </p>
 		</div>
    );
  }
}