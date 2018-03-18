import React, { Component } from 'react'
import UsersContract from '../../build/contracts/Users.json'
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
            SellerID: '',
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
        this.setState({SellerID: event.target.value});
    }

    handleChangePIN(event) {
        this.setState({PIN: event.target.value});
    }

    handleChangeAmount(event) {
        this.setState({EthForTransfer: event.target.value});
    }

    handleTransfer(event){

        if(this.state.SellerID == null || this.state.firstName === ''){
            alert('missing seller ID');
            event.preventDefault(); //what does it do?
        }

        else if(this.state.PIN == null || this.state.lastName === ''){
            alert('missing PIN');
            event.preventDefault(); //what does it do?
        }

        else if(this.state.EthForTransfer == null || this.state.birthDate === ''){
            alert('missing ether amount to transfer');
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
                    <input type="text" placeholder="Seller ID" value={this.state.firstName} onChange={this.handleChangeFirstName} />
                </label>
                <br /><br />
                <label>
                    <input type="text" placeholder="PIN" value={this.state.lastName} onChange={this.handleChangeLastName} />
                </label>
                <br /><br />
                <label>
                    <input type="text" placeholder="Eth Amount" value={this.state.birthDate} onChange={this.handleChangeBirthDate} />
                </label>
                <br /><br />
                <input type="submit" value="Submit" className="pure-button pure-button-primary"/>
            </form>
        );
    }
}