import React, { Component } from 'react'
//import UsersContract from '../../build/contracts/Users.json'
import getWeb3 from '../utils/getWeb3'
import UsersContract from '../../build/contracts/USERS.json'
import ParcelContract from '../../build/contracts/PARCELS.json'

export default class Register extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            userContract: null,
            web3: null,
            userID: null,
            numUsersTot: 0,
            parcelContract: null,
            contract: null,
            fullName: '',
            TIN: '',
            lawyerID: '',
            eaUser: '',
            eaParcel: '',
            PIN: '',
        };

        this.handleChangeFullName = this.handleChangeFullName.bind(this)
        this.handleChangeTIN = this.handleChangeTIN.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleCreateUser = this.handleCreateUser.bind(this)
        this.handleCreateParcel = this.handleCreateParcel.bind(this)
        this.handleChangelawyerID = this.handleChangelawyerID.bind(this)
        this.handleChangePIN= this.handleChangePIN.bind(this)
        this.handleChangeEaUser = this.handleChangeEaUser.bind(this)
        this.handleChangeEaParcel = this.handleChangeEaParcel.bind(this)
        this.handleParcelSubmit = this.handleParcelSubmit.bind(this)
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
        this.setState({userContract: this.state.contract(UsersContract)})
        this.state.userContract.setProvider(this.state.web3.currentProvider)
        console.log('User contract called by Register component')
        
        this.setState({parcelContract: this.state.contract(ParcelContract)})
        this.state.parcelContract.setProvider(this.state.web3.currentProvider)
        console.log('Parcel contract called by Register component')
        this.updateUserNum()
    }

    handleChangeFullName(event) {
        this.setState({fullName: event.target.value});
    }

    handleChangeTIN(event) {
        this.setState({TIN: event.target.value});
    }

    handleChangelawyerID(event) {
        this.setState({lawyerID: event.target.value});
    }

    handleChangeEaUser(event) {
        this.setState({eaUser: event.target.value});
    }
    
    handleChangeEaParcel(event) {
        this.setState({eaParcel: event.target.value});
    }
    
    handleChangePIN(event) {
        this.setState({PIN: event.target.value});
    }

    updateUserNum() {
         var userInstance

         this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.userContract.deployed().then((instance) => {
                userInstance = instance
                return userInstance.get_user_list_length()

            }).then((result) => {
                console.log(result.c[0])
                // result.c contains return value from function
                this.setState({numUsersTot: result.c[0]})
            })
        })
    }

    handleRegister(event){

        if(this.state.fullName === ''){
            alert('missing full name');
            event.preventDefault(); 
        }

        else if(this.state.TIN === ''){
            alert('missing TIN input');
            event.preventDefault(); 
        }

        else if(this.state.lawyerID === ''){
            alert('missing lawyerID');
            event.preventDefault(); 
        }
        
        else if(this.state.eaUser === ''){
            alert('missing ethereum address');
            event.preventDefault(); 
        }

        else{
            event.preventDefault()
            console.log(this.state)
            this.handleCreateUser()
         }
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
         }
    }

    handleCreateUser() {
        var userInstance
        var numUsers

        this.state.web3.eth.getAccounts((error, accounts) => {

            this.state.userContract.deployed().then((instance) => {

            userInstance = instance
            console.log("current ethereum account: ", this.state.eaUser)
            console.log("in handleCreateUser")

            /* need to make admin here, so that we can created users, 
               normally, this "admin" account would be preseeded and not done as a JS
               function call */



            //return userInstance.set_admin({from: accounts[0]})   

        // }).then((results) =>{
        //     //if no errors, user is set as admin
        //     console.log("user set as admin!")
        //     console.log(results)
             return userInstance.get_user_list_length()

        }).then((result) => {

            // use num of users + 1 as arbitrary index value
            numUsers = result.c[0]
            this.setState({userID: numUsers + 1})


            return userInstance.create_user_record (
                this.state.web3.fromAscii(this.state.fullName),
                this.state.web3.fromAscii(this.state.TIN), 
                this.state.eaUser,
                this.state.userID,
                parseInt(this.state.lawyerID, 10),
                false,
                {from: accounts[0]} // this account has to be the admin account!
            )

          }).then((result) => {

            // User creation finished 
            alert("User Created!")
            console.log("User added to the blockchain, user id is ", this.state.userID)
            
            this.setState({numUsersTot: numUsers + 1})
           })
        })
    }

    // function to handle creation of land parcels
    handleCreateParcel () {
        var parcelInstance
        var userInstance
        var uid

        this.state.web3.eth.getAccounts((error, accounts) => {

            this.state.userContract.deployed().then((instance) => {
                // capture user instance to access user functions
                userInstance = instance
                return userInstance.get_user_id_from_eth_addr(this.state.eaParcel)
                // get user id from ea 
                }).then((result) => {
                    uid = result
                })

            this.state.parcelContract.deployed().then((instance) => {
                // capture instance use to access parcel functions
                parcelInstance = instance
                console.log("in handleCreateParcel")
                
            }).then((result) => {
                //Solidity function call to create land parcel
                return parcelInstance.create_parcel_record(
                    parseInt(this.state.PIN, 10),
                    uid, 
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
            <div className="pure-g">
                <div className="pure-u-12-24">
                <form onSubmit={this.handleRegister} className="form pure-form pure-form-alligned register-form">
                    <h1 className="form-title">Register New User</h1>
                    <br /><br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="fullname" value={this.state.fullName} onChange={this.handleChangeFullName} />
                    </label>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="TIN" value={this.state.TIN} onChange={this.handleChangeTIN} />
                    </label>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="lawyer ID" value={this.state.lawyerID} onChange={this.handleChangelawyerID} />
                    </label>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="Ethereum Address" value={this.state.eaUser} onChange={this.handleChangeEaUser} />
                    </label>
                    <br /><br />
                    <input type="submit" value="Register" className="pure-button pure-button-primary button-xlarge form-button"/>
                    <br /><br />
                </form>
                </div>

                <div className="pure-u-12-24">
                <form onSubmit={this.handleParcelSubmit} className="form pure-form pure-form-alligned register-form">
                    <h1 className="form-title">Register New Parcel</h1>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="PIN" value={this.state.PIN} onChange={this.handleChangePIN} />
                    </label>
                    <br /><br />
                    <label>
                        <input className="pure-form pure-input-1-2" type="text" placeholder="Ethereum Address" value={this.state.eaParcel} onChange={this.handleChangeEaParcel} />
                    </label>
                    <br /><br />
                    <input type="submit" value="Create Parcel" className="pure-button pure-button-primary button-xlarge form-button"/>
                    <br /><br />
                </form>
                </div>

                <div className="pure-u-1-1 right-content">
                    <br /><br />
                    <h2>Current number of users signed up
                        <div className="bold-red">{this.state.numUsersTot}</div>
                    </h2>
                    <p> In production, this page will only be avaiable to the administrator</p>
                    <p> For the ethereum address fields, please pick an available address from your wallet </p>
                    <p> When the submit button is pressed, a metamask transaction will pop-up if done correctly</p>
                    <p> *Note: account[0] on your wallet will correspond to account 1 on metamask </p>
                </div>
            </div>
        );
    }
}