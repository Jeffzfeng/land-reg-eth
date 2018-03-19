import React, { Component } from 'react'
import UsersContract from '../../build/contracts/USERS.json'
import getWeb3 from '../utils/getWeb3'

export default class Transfer extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            landTransfer: null,
            contract: null,
            web3: null,
            sellerID: '',
            buyerID: '',
            salePrice: '',
            landPIN: '',
            ethAddr: '',
            PIN: '',
            EthForTransfer: '',
            numTransfers: 0
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
        console.log('User contract called by Transfer component')
        console.log("state of user contract: ", this.state.user)
    }

    handleChangeSellerID(event) {
        this.setState({sellerID: event.target.value});
    }

    handleChangeBuyerID(event) {
        this.setState({buyerID: event.target.value});
    }

    handleChangeLandPIN(event) {
        this.setState({landPIN: event.target.value});
    }

    handleChangeEthAddr(event) {
        this.setState({ethAddr: event.target.value});
    }

    handleChangeSalePrice(event){
        this.setState({salePrice: event.target.value});
    }


    handleTransfer(event){

        if(this.state.sellerID == null || this.state.sellerID === ''){
            alert('missing seller ID');
            event.preventDefault(); //what does it do?
        }

        else if(this.state.buyerID == null || this.state.buyerID === ''){
            alert('missing buyerID');
            event.preventDefault(); //what does it do?
        }

        else if(this.state.ethAddr == null || this.state.ethAddr === ''){
            alert('missing ethereum address');
            event.preventDefault(); //what does it do?
        }

        else if(this.state.salePrice ==null || this.state.salePrice == ''){
            alert('mising sale price');
            event.preventDefault();
        }

        else if(this.state.landPIN == null || this.state.landPIN === ''){
            alert('missing PIN');
            event.preventDefault(); //what does it do?
        }

        else{
            event.preventDefault()
            console.log(this.state)
            //this.handleCreateUser()
         }
    }

    handleCreateLandTransfer() {
        var userInstance

        // add error checking later
        //retrieve the seller ethereum id from the sellerid
        //then call the createlandtransfer function
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.user.deployed().then((instance) => {
            userInstance = instance
            console.log("in transfer js file");
            return userInstance.get_ethereum_address_from_user_id(
                this.state.web3.fromAscii(this.state.sellerID),{from: accounts[0]}
            )
          }).then((result) => {
              console.log("ethereum address is: ")
              console.log(result);
           })
        })
    }
    //the buyer id is just accounts[0]
    //this form is for the buyer
    render(){
        return (
        <div className="pure-g">
          <div className="pure-u-13-24">
            <form onSubmit={this.handleRegister} className="form pure-form pure-form-alligned">
                <h1 className="form-title">Create New Land Transfer</h1>
                <br /><br /><br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="Seller ID" value={this.state.sellerID} onChange={this.handleChangeSellerID} />
                </label>
                <br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="Selling Price" value={this.state.salePrice} onChange={this.handleChangeSalePrice} />
                </label>
                <br /><br />

                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="landPIN" value={this.state.landPIN} onChange={this.handleChangeLandPIN} />
                </label>
                <br /><br />
                <label>
                    <input className="pure-form pure-input-1-2" type="text" placeholder="Seller Ethereum Address" value={this.state.ethAddr} onChange={this.handleChangeEthAddr} />
                </label>
                <br /><br />
                <input type="submit" value="Submit" className="pure-button pure-button-primary button-xlarge form-button"/>
            </form>
         </div>
        <div className="pure-u-8-24 right-content">
            <br /><br />
            <h1>Current number of transfers registered
                <div className="bold-red">{this.state.numTransfers}</div>
            </h1>
        </div>
      </div>
        );
    }
}