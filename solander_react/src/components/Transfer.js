import React, { Component } from 'react'
import UsersContract from '../../build/contracts/USERS.json'
import TransferContract from '../../build/contracts/PIN_TRANSFER.json'
import getWeb3 from '../utils/getWeb3'

export default class Transfer extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            userContract: null,
            landTransferContract: null,
            contract: null,
            web3: null,
            buyerEa: '',
            buyerID: '',
            salePrice: '',
            PIN: '',
            EthForTransfer: '',
            numTransfers: 0
        };
        
        this.handleChangeBuyerEa = this.handleChangeBuyerEa.bind(this)
        this.handleChangePIN = this.handleChangePIN.bind(this)
        this.handleChangeSalePrice = this.handleChangeSalePrice.bind(this)
        this.handleTransfer = this.handleTransfer.bind(this)
        this.handleGetID = this.handleGetID.bind(this)
        this.handleTransferRequest = this.handleTransferRequest.bind(this)

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
        // initiating contract for transfer page
        this.setState({contract: require('truffle-contract')})
        this.setState({userContract: this.state.contract(UsersContract)})
        this.state.userContract.setProvider(this.state.web3.currentProvider)
        console.log('User contract called by Transfer component')

        //initiating contract for transfer page
        this.setState({landTransferContract: this.state.contract(TransferContract)})
        this.state.landTransferContract.setProvider(this.state.web3.currentProvider)
        console.log('Transfer contract called by Transfer component')
    }

    handleChangeBuyerEa(event) {
        this.setState({buyerEa: event.target.value});
    }

    handleChangePIN(event) {
        this.setState({PIN: event.target.value});
    }

    handleChangeSalePrice(event){
        this.setState({salePrice: event.target.value});
    }


    handleTransfer(event){

        if(this.state.buyerEa === ''){
            alert('missing buyer ethereum address');
            event.preventDefault(); 
        }

        else if(this.state.salePrice === ''){
            alert('mising sale price');
            event.preventDefault();
        }

        else if(this.state.PIN === ''){
            alert('missing PIN');
            event.preventDefault(); 
        }

        else {
            event.preventDefault()
            console.log(this.state)
            this.handleGetID()
         }
    }

    handleGetID() {
        var userInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
            // use user contract to get access to user functions
            this.state.userContract.deployed().then((instance) => {
                userInstance = instance
                console.log("handling create land transfer");
                return userInstance.get_user_id_from_eth_addr(this.state.buyerEa)
            }).then((result) => {
              console.log(result.c[0]);
                if(result.c[0]!==0) {
                    this.setState({buyerID: result.c[0]})
                    this.handleTransferRequest()
                }
                else {
                    alert("not a valid ethereum address!")
                }
            })
        })
    }

    handleTransferRequest() {
        var transferInstance

        this.state.web3.eth.getAccounts((error, accounts) => {
        // use user contract to get access to user functions
            this.state.landTransferContract.deployed().then((instance) => {
                transferInstance = instance
                return transferInstance.create_pin_transfer_request(
                    this.state.buyerID,
                    parseInt(this.state.salePrice, 10), 
                    parseInt(this.state.PIN, 10), 
                    {from: accounts[0]}
                )
            }).then((result) => {
                console.log("transfer request sent to user with ID ", this.state.buyerID)
            })
        })
    }

    render(){
        return (
            <form onSubmit={this.handleTransfer} className="form pure-form pure-form-alligned transfer-form">
                <h2 className="form-title">Create New Land Transfer</h2>
                <br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="Buyer Ethereum Address" value={this.state.buyerEa} onChange={this.handleChangeBuyerEa} />
                </label>
                <br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="Selling Price" value={this.state.salePrice} onChange={this.handleChangeSalePrice} />
                </label>
                <br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="PIN" value={this.state.PIN} onChange={this.handleChangePIN} />
                </label>
                <br /><br />
                <input type="submit" value="Submit" className="pure-button pure-button-primary button-large form-button"/>
            </form>
        );
    }
}