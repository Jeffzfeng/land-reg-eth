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
            user: null,
            user_id: null,
            parcel: null,
            contract: null,
            fullName: '',
            birthDate: '',
            web3: null
        };

        this.handleChangeFullName = this.handleChangeFullName.bind(this)
        //this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleCreateUser = this.handleCreateUser.bind(this)
        this.handleCreateParcel = this.handleCreateParcel.bind(this)
        
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
        console.log('User contract called by Register component')
        this.setState({parcel: this.state.contract(ParcelContract)})
        this.state.parcel.setProvider(this.state.web3.currentProvider)
        console.log('Parcel contract called by Register component')
    }

    handleChangeFullName(event) {
        this.setState({fullName: event.target.value});
    }

    // handleChangeLastName(event) {
    //     this.setState({lastName: event.target.value});
    // }

    handleChangeBirthDate(event) {
        this.setState({birthDate: event.target.value});
    }

    handleRegister(event){

        if(this.state.fullName == null || this.state.fullName === ''){
            alert('missing full name');
            event.preventDefault(); //what does it do?
        }

        else if(this.state.birthDate == null || this.state.birthDate === ''){
            alert('missing birth date name');
            event.preventDefault(); //what does it do?
        }

        else{
            event.preventDefault()
            console.log(this.state)
            this.handleCreateUser()
         }
    }

    handleCreateUser() {
        var userInstance

        // add error checking later

        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.user.deployed().then((instance) => {
            userInstance = instance
            console.log("current ethereum account: ",accounts)
            console.log("in handleCreateUser")
            return userInstance.get_user_list_length()
        }).then((result) => {

            this.setState({user_id: result.c[0] + 1})
            console.log(this.state.user_id)

            return userInstance.create_user_record(
                result.c[0],
                this.state.web3.fromAscii(this.state.fullName),
                this.state.web3.fromAscii(this.state.birthDate), 
                accounts[0],
                1,
                {from: accounts[0]}
            )
          }).then((result) => {
            console.log(result)
             alert("User Created!")
            console.log("User added to the blockchain")
            this.setState({sinID: this.state.sinID + 1})
            this.handleCreateParcel(3)
            this.handleCreateParcel(4)
            this.handleCreateParcel(5)
           })
        })
    }

    handleCreateParcel (int) {
        var parcelInstance
        var pin = int

        this.state.web3.eth.getAccounts((error, accounts) => {
                this.state.parcel.deployed().then((instance) => {
                parcelInstance = instance
                console.log("in handleCreateParcel")
                return parcelInstance.create_parcel_record(pin, this.state.user_id, {from: accounts[0]})
            }).then((result) => {
                console.log(result)    
            })  
        })
    }

    render(){
        return (
            <form onSubmit={this.handleRegister} className="form pure-form pure-form-alligned">
                <h2>Register</h2>
                <label>
                    <input type="text" placeholder="fullname" value={this.state.fullName} onChange={this.handleChangeFullName} />
                </label>
                <br /><br />
                <label>
                    <input type="text" placeholder="brithdate e.g. MM/DD/YYYY" value={this.state.birthDate} onChange={this.handleChangeBirthDate} />
                </label>
                <br /><br />

                <input type="submit" value="Register" className="pure-button pure-button-primary"/>
            </form>
        );
    }
}