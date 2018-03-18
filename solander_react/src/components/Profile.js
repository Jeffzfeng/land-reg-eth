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
            ownedPINs: '',
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
         	return userInstance.get_user_record_from_user_id_new(result)
         }).then((result) => {
         	  var asc_fname, asc_lname, asc_bdate;
              var fname, lname, bdate;

	          // remove insignificant trailing zeroes
	          asc_fname = result[0].replace(/0+$/g, "")
	          asc_bdate = result[1].replace(/0+$/g, "")
	          //asc_lname = result[1].replace(/0+$/g, "")
	          //asc_bdate = result[2].replace(/0+$/g, "")

	          // convert to ASCII
	          fname = this.state.web3.toAscii(asc_fname)
	          bdate = this.state.web3.toAscii(asc_bdate)
         	  console.log(fname)
         	  console.log(bdate)
         	  console.log(result)
         	  this.setState({firstName: fname})
         })
      })
    }

  render() {
    return (
    	<div className="profile">
   			<h2>Welcome Back, {this.state.firstName}</h2>
 		</div>
    );
  }
}