import React, { Component } from 'react'
import ParcelContract from '../../build/contracts/PARCELS.json'
import getWeb3 from '../utils/getWeb3'

export default class Search extends Component{


    constructor(props)
    {
        super(props);
        this.state = {
            parcel: null,
            contract: null,
            PIN: '',
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
    }

	handleChangePIN(event) {
        this.setState({PIN: event.target.value});
    }

    handleSearchQuery (event) {
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

        // add error checking later
        //retrieve the seller ethereum id from the sellerid
        //then call the createlandtransfer function
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.parcel.deployed().then((instance) => {
            parcelInstance = instance
            console.log("handling search..");

            return parcelInstance.get_parcel_record_from_pin_tuple(
                parseInt(this.state.PIN, 10))
	        }).then((result) => {
	        	var PIN_owner = result.c[0]
	        	if(PIN_owner!==0) {
	        		console.log("The owner of PIN ", this.state.PIN, " is ", PIN_owner)
	        	}
	        	else
	        	   console.log("PIN ", this.state.PIN, " not found in the blockchain!")
	        })
        })
    }

	render() {
        return (
        <div className="pure-g">
          <div className="pure-u-13-24">
            <form onSubmit={this.handleSearchQuery} className="form pure-form pure-form-alligned">
                <h1 className="form-title">Search For Land Parcel</h1>
                <br /><br /><br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="PIN" value={this.state.PIN} onChange={this.handleChangePIN} />
                </label>
                <br /><br />
                <input type="submit" value="Search" className="pure-button pure-button-primary button-xlarge form-button"/>
            </form>
          </div>
         </div>
		);
	}
}