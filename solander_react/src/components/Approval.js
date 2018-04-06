import React, { Component } from 'react'


export default class Approval extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            userContract: null,
            transferContract: null,
            parcelContract: null,
            contract: null
        };

        this.handleApprovalBuyer = this.handleApprovalBuyer.bind(this)
        this.removePending = this.removePending.bind(this)
    }

    handleApprovalBuyer() {
    	// eslint-disable-next-line
    	var parcelInstance

  		alert("approval received from buyer!")
  		this.props.web3.eth.getAccounts((error, accounts) => {

           this.props.parcelContract.deployed().then((instance) => {
           	parcelInstance = instance

	           	return parcelInstance.transfer_pin_test (
	           		parseInt(this.props.pin, 10), 
	           		parseInt(this.props.uid, 10),
	           		{from:accounts[0]}
	           	  ) 
           	}).then((result) => {
           		console.log(result)
           		alert("All parties have approved! Transfering land data..")
           		this.removePending()
           	})
  		    // this.props.transferContract.deployed().then((instance) => {
        //    	transferInstance = instance

        //    	return transferInstance.execute_land_transfer_test (
        //    		parseInt(this.props.pin, 10), 
        //    		{from:accounts[0]}
        //    	  ) 
        //    	}).then((result) => {
        //    		console.log(result)
        //    	})
        })
	}

	removePending() {
		var transferInstance

		this.props.web3.eth.getAccounts((error, accounts) => {

           this.props.transferContract.deployed().then((instance) => {
	           	transferInstance = instance

		           	return transferInstance.delete_pptr_by_pin(
		           		parseInt(this.props.pin, 10),
		           		{from: accounts[0]}) 
		   }).then((result) => {
		   		console.log(result)
		   })
		})
	}

   render() {
	    return (
		  <div>
		      <button className="approval-button btn btn-success" onClick={this.handleApprovalBuyer}>
		         Buyer: Approve
		     </button>
		  </div>
		)
	}
}