import React, { Component } from 'react'
//import UsersContract from '../../build/contracts/Users.json'
//import getWeb3 from '../../utils/getWeb3'
//import UsersContract from '../../../build/contracts/USERS.json'
//import ParcelContract from '../../../build/contracts/PARCELS.json'

export default class RegisterParcel extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            userID: null,
            numUsersTot: 0,
            eaParcel: '',
            PIN: ''
        };

        this.handleChangeEaParcel = this.handleChangeEaParcel.bind(this)
        this.handleChangePIN = this.handleChangePIN.bind(this)
        this.handleParcelSubmit = this.handleParcelSubmit.bind(this)
        this.handleCreateParcel = this.handleCreateParcel.bind(this)
    }

    componentWillMount() {
        
        // getWeb3
        // .then(results => {
        //   this.setState({
        //     web3: results.web3
        //   })

        //   // Instantiate contract once web3 provided.
        //   this.instantiateContract()
        // })
        // .catch(() => {
        //   console.log('Error finding web3. or contract instantiation failed')
        // })
        //this.updateUserNum()
    }

    instantiateContract() {
        // initiating contract for register page
        // this.setState({contract: require('truffle-contract')})
        // this.setState({userContract: this.state.contract(UsersContract)})
        // this.state.userContract.setProvider(this.state.web3.currentProvider)
        // console.log('User contract called by Register component')
        
        // this.setState({parcelContract: this.state.contract(ParcelContract)})
        // this.state.parcelContract.setProvider(this.state.web3.currentProvider)
        // console.log('Parcel contract called by Register component')
        //this.updateUserNum()
    }

    handleChangeEaParcel(event) {
        this.setState({eaParcel: event.target.value});
    }
    
    handleChangePIN(event) {
        this.setState({PIN: event.target.value});
    }

    handleParcelSubmit(event){

        if(this.state.PIN === ''){
            alert('missing PIN');
            event.preventDefault(); 
        }

        else if(this.state.eaParcel === ''){
            alert('missing ea input');
        }

        else{
            event.preventDefault()
            console.log(this.state)
            this.handleCreateParcel()
            console.log("here")
         }
    }

    // function to handle creation of land parcels
    handleCreateParcel () {
        var parcelInstance
        var userInstance
        var uid

        this.props.web3.eth.getAccounts((error, accounts) => {

            this.props.userContract.deployed().then((instance) => {
                // capture user instance to access user functions
                userInstance = instance
                return userInstance.get_user_id_from_eth_addr(this.state.eaParcel)
                // get user id from ea 
                }).then((result) => {
                    uid = result.c[0]
                    console.log(result.c[0])
                })

            this.props.parcelContract.deployed().then((instance) => {
                // capture instance use to access parcel functions
                parcelInstance = instance
                console.log("in handleCreateParcel")
                
            }).then((result) => {
                //Solidity function call to create land parcel
                return parcelInstance.create_parcel_record_test (
                    1,
                    1, 
                    {from: accounts[0]}
                )
            // catch callback of solidity function
            }).then((result) => {
                console.log(result)   
                console.log("parcel created with PIN of ", this.state.PIN, "for user with account address ", this.state.eaParcel) 
            })  
        })
    }

      render(){
        return (

                <form onSubmit={this.handleParcelSubmit} className="form pure-form pure-form-alligned register-form">
                    <h2 className="form-title">Register New Parcel</h2>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="PIN" value={this.state.PIN} onChange={this.handleChangePIN} />
                    </label>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="Ethereum Address" value={this.state.eaParcel} onChange={this.handleChangeEaParcel} />
                    </label>
                    <br /><br />
                    <input type="submit" value="Create Parcel" className="pure-button pure-button-primary button-large"/>
                    <br /><br />
            	</form>
            );
       	 }
     }