import React, { Component } from 'react'
//import UsersContract from '../../build/contracts/Users.json'
import getWeb3 from '../utils/getWeb3'
import UsersContract from '../../build/contracts/USERS.json'

export default class Register extends Component
{
    
    
    constructor(props)
    {
        super(props);
        this.state = {
            user: null,
            contract: null,
            firstName: '',
            lastName: '',
            birthDate: '',
            web3: null
        };

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        //this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this)
        
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
        console.log("state of user contract: ", this.state.user)
    }

    handleChangeFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    // handleChangeLastName(event) {
    //     this.setState({lastName: event.target.value});
    // }

    handleChangeBirthDate(event) {
        this.setState({birthDate: event.target.value});
    }

    handleRegister(event){

        if(this.state.firstName == null || this.state.firstName === ''){
            alert('missing first name');
            event.preventDefault(); //what does it do?
        }

        // else if(this.state.lastName == null || this.state.lastName === ''){
        //     alert('missing last name name');
        //     event.preventDefault(); //what does it do?
        // }

        else if(this.state.birthDate == null || this.state.birthDate === ''){
            alert('missing birth date name');
            event.preventDefault(); //what does it do?
        }

        else{
            event.preventDefault()
            console.log(this.state)
            this.handleCreateUser()
            //.then(() => console.log("handle user creation")
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
            console.log(result.c[0])
            return userInstance.create_user_record(
                result.c[0],
                this.state.web3.fromAscii(this.state.firstName),
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
           })
        })
    }

    render(){
        return (
            <form onSubmit={this.handleRegister} className="form pure-form pure-form-alligned">
                <h2>Register</h2>
                <label>
                    <input type="text" placeholder="firstname" value={this.state.firstName} onChange={this.handleChangeFirstName} />
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