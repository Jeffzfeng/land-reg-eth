import React, { Component } from 'react'

export default class PendingTransfers extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state = {
        	pendingEa: '',
        	pendingPIN: ''
        };

      	this.handleGetPINList = this.handleGetPINList.bind(this)

    }


    componentDidMount() {

        //	returns pending pin list
        this.handleGetPINList()
    }


    handleGetPINList () {
        var transferInstance
        console.log("here")
        this.props.web3.eth.getAccounts((error, accounts) => {

            this.props.transferContract.deployed().then((instance) => {
            	transferInstance = instance

            	return transferContract.get_pptr_list()
            }).then((result) => {
            	console.log(result)
            }
        })
    }

    render() {
    	return (
    	<div>
         <h2>Pending Transfer</h2>
            <p>
               From Ethereum Adress :
              <span className="profile-field"> {this.state.pendingEa} </span>
            </p>
            <p>
               For PIN : 
              <span className="profile-field"> {this.state.pendingPIN} </span>
            </p>
         </div>
        );
     }
 }