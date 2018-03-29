import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import UsersContract from '../../build/contracts/USERS.json'
import ParcelsContract from '../../build/contracts/PARCELS.json'
import Transfer from './Transfer'

export default class Profile extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            userContract: null,
            parcelContract: null,
            contract: null,
            userID: '',
            fullName: '',
            tinHash: '',
            ethereumAddress: '',
            lawyerID: '',
            ownedPINs: [],
            web3: null
        };

        this.handleProfilePage = this.handleProfilePage.bind(this)
        this.handlePinList = this.handlePinList.bind(this)

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
          console.log('Error finding web3 or contract instantiation failed')
        })
    }

    instantiateContract() {
        //initiating contract for profile page
        this.setState({contract: require('truffle-contract')})
        this.setState({userContract: this.state.contract(UsersContract)})
        this.state.userContract.setProvider(this.state.web3.currentProvider)
        console.log('User contract called by Profile component')

        // initiating contract for profile page
        this.setState({parcelContract: this.state.contract(ParcelsContract)})
        this.state.parcelContract.setProvider(this.state.web3.currentProvider)
        console.log('Parcel contract called by Profile component')
        return this.handleProfilePage()
    }

    handleProfilePage(){
	  var userInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.userContract.deployed().then((instance) => {
            userInstance = instance
            console.log("current ethereum account: ",accounts)
            console.log("in handleProfilePage")
            return userInstance.get_user_id_from_eth_addr(accounts[0])
         }).then((result) => {
            this.setState({userID: result})
         	  return userInstance.get_user_record_from_user_id_tuple(this.state.userID)
         }).then((result) => {

	          // remove insignificant trailing zeroes
	          var asc_fullname = result[0].replace(/0+$/g, "")
	          var asc_th = result[1].replace(/0+$/g, "")

	          // // convert to ASCII
	          var fullname = this.state.web3.toAscii(asc_fullname)
	          var th = this.state.web3.toAscii(asc_th)
            var eth_address = result[2]
            var lawyer_id = result[3].c[0]

           //  // print for testing
         	  console.log(fullname)
         	  console.log(th)
            console.log(lawyer_id)
            console.log(eth_address)
         	  this.setState({fullName: fullname})
            this.setState({tinHash: th})
            this.setState({ethereumAddress: eth_address})
            this.setState({lawyerID: lawyer_id})
            this.handlePinList()
         })
      })
    }

    handlePinList() {
      var parcelInstance

       this.state.web3.eth.getAccounts((error, accounts) => {
            // use parcel instance to access functions
            this.state.parcelContract.deployed().then((instance) => {
            parcelInstance = instance
            // call Solidity function to return PIN list of a user
            return parcelInstance.get_pin_list_from_uid(this.state.userID)
         }).then((result) => {
            var i
            for (i=0;i<result.length-1;i++){
              // iterate and set state for each element
              this.setState({
                ownedPINs: [...this.state.ownedPINs, result[i].c[0], ", "]
              })
            }
            // set last one without comma
            this.setState({
                ownedPINs: [...this.state.ownedPINs, result[i].c[0]]
            })
         })
      })
    }

  render() {
    return (
    	<div className="profile-main pure-g">
          <div className="profile-info pure-u-8-24">
       			<h2>Welcome Back, {this.state.fullName}</h2>
            <br /><br />
            <p>
               TIN hash :
              <span className="profile-field"> {this.state.tinHash}</span>
            </p>
            <p>
               LawyerID : 
              <span className="profile-field"> {this.state.lawyerID}</span>
            </p>
            <p>
               Eth Wallet Address : 
              <span className="profile-field"> {this.state.ethereumAddress}</span>
            </p>
            <p>
                PIN owned : 
                <span className="profile-field"> {this.state.ownedPINs}</span>
            </p>
            <p>Pending Transfers: {this.state.pendingTransfers} </p>
        </div>
        <br /><br />
        <div className="profile-info pure-u-14-24">
          <Transfer />
        </div>
        <br /><br /><br />
 		</div>
    );
  }
}