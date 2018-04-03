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