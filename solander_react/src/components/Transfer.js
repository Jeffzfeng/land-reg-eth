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
            EthForTransfer: ''
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

        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.user.deployed().then((instance) => {
            userInstance = instance
            console.log("accounts avaialable: ",accounts)
            console.log("in handleCreateUser")
            return userInstance.create_user_record(
                this.state.web3.fromAscii(this.state.firstName),
                this.state.web3.fromAscii(this.state.lastName),
                1,
                this.state.web3.fromAscii(this.state.birthDate), 
                {from: accounts[0]}
            )
          }).then((result) => {
            console.log(result)
             alert("User Created!")
            console.log("User added to the blockchain")
            this.setState({sinID: this.state.sinID + 1})
           })
        })
    }

    render(){
        return (
            <form onSubmit={this.handleRegister} className="form pure-form pure-form-alligned">
                <h2>Create New Land Transfer</h2>
                <label>
                    <input type="text" placeholder="Seller ID" value={this.state.sellerID} onChange={this.handleChangeSellerID} />
                </label>
                <br /><br />
                <label>
                    <input type="text" placeholder="Buyer ID" value={this.state.buyerID} onChange={this.handleChangeBuyerID} />
                </label>
                <br /><br />

                <label>
                    <input type="text" placeholder="Selling Price" value={this.state.salePrice} onChange={this.handleChangeSalePrice} />
                </label>
                <br /><br />

                <label>
                    <input type="text" placeholder="landPIN" value={this.state.landPIN} onChange={this.handleChangeLandPIN} />
                </label>
                <br /><br />

                <label>
                    <input type="text" placeholder="Seller Ethereum Address" value={this.state.ethAddr} onChange={this.handleChangeEthAddr} />
                </label>
                <br /><br />
                <input type="submit" value="Submit" className="pure-button pure-button-primary"/>
            </form>
        );
    }
}