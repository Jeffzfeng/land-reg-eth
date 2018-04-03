import React, { Component } from 'react'
import ParcelContract from '../../build/contracts/PARCELS.json'
import UserContract from '../../build/contracts/USERS.json'
import getWeb3 from '../utils/getWeb3'

export default class Search extends Component{


    constructor(props)
    {
        super(props);
        this.state = {
            parcel: null,
            user: null,
            contract: null,
            PIN: '',
            userID: '',
            ea: '',
            web3: null,
        };

        this.handleChangePIN = this.handleChangePIN.bind(this)
        this.handleSearchQuery = this.handleSearchQuery.bind(this)
        this.handleContractSearch = this.handleContractSearch.bind(this)
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
        this.setState({parcel: this.state.contract(ParcelContract)})
        this.state.parcel.setProvider(this.state.web3.currentProvider)
        console.log('User contract called by Search component')

        // initiating contract for register page
        this.setState({user: this.state.contract(UserContract)})
        this.state.user.setProvider(this.state.web3.currentProvider)
        console.log('User contract called by Search component')
    }

	handleChangePIN(event) {
        this.setState({PIN: event.target.value});
    }

    handleSearchQuery(event) {
    	if(this.state.PIN === undefined){
            alert('missing PIN');
            event.preventDefault(); 
        }
        else{
            event.preventDefault()
			this.handleContractSearch()            
        }
    }

    handleContractSearch() {
    	var parcelInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.parcel.deployed().then((instance) => {
            parcelInstance = instance
            console.log("handling search..");

            return parcelInstance.get_parcel_record_from_pin_tuple(
                parseInt(this.state.PIN, 10))
	        }).then((result) => {
                this.setState({userID: result.c[0]})
	        	if(this.state.userID!==0) {
                    this.handleGetEa()
	        		console.log("The owner of PIN ", this.state.PIN, " is ", this.state.userID)
	        	}
	        	else
	        	   alert("PIN not found in the blockchain!")
	        })
        })
    }

    handleGetEa() {
        var userInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.user.deployed().then((instance) => {   
                userInstance = instance
                console.log(this.state.userID)

            return userInstance.get_user_record_from_user_id_tuple(this.state.userID)
         }).then((result) => {
                console.log(result)
                this.setState({ea: result[2]})
            })
        })
    }

	render() {
        return (
        <div className="pure-g">
          <div className="pure-u-13-24">
            <form onSubmit={this.handleSearchQuery} className="form pure-form pure-form-alligned search-form">
                <h2 className="form-title">Search For Land Parcel</h2>
                <br /><br /><br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="PIN" value={this.state.PIN} onChange={this.handleChangePIN} />
                </label>
                <br /><br />
                <input type="submit" value="Search" className="pure-button pure-button-primary button-large form-button"/>
            </form>
            <br /><br />
            </div>
              <div className="profile-info pure-u-13-24 search-results">
                    <h2>Search Results</h2>
                <br /><br />
                <p>
                    PIN :
                  <span className="profile-field"> {this.state.PIN}</span>
                </p>
                <p>
                    Is owned by ID : 
                  <span className="profile-field"> {this.state.userID}</span>
                </p>
                <p>
                   Their Eth Wallet Address is: 
                  <span className="profile-field"> {this.state.ea}</span>
                </p>
             </div>
         </div>
		);
	}
}