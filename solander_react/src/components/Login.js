import React, { Component } from 'react'
import UsersContract from '../../build/contracts/Users.json'
import getWeb3 from '../utils/getWeb3'

export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
    	username: '',
		  password: '',
      web3: null
	};

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleButtonLogin = this.handleButtonLogin.bind(this)
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
      console.log('User contract called by Login component')
      console.log("state of user contract: ", this.state.user)
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
  	this.setState({password: event.target.value});
  }

  handleLogin(event) {
  	if(this.state.username==null || this.state.username===''){
  		alert('login unsuccessful, please check input values')
  		event.preventDefault();
  	}

  	else{
    	alert('Login by ' + this.state.username + ' successful!')
    	event.preventDefault();
    }
  }

  handleButtonLogin(event) {
    //alert("button pressed")
    //event.preventDefault()        
    var userInstance

    // add error checking later

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.user.deployed().then((instance) => {
        userInstance = instance
        console.log("accounts avaialable: ",accounts)
        console.log("in handleButtonLogin")
        return userInstance.get_user_record(1)
      }).then((result) => {
          console.log(this.state.web3.toAscii(result[0]))
          console.log(this.state.web3.toAscii(result[1]))
          console.log(this.state.web3.toAscii(result[2]))
          alert("Welcome back !")
      })
    })
  }

  render() {
    return (
        <div>
        <form onSubmit={this.handleLogin} className="form pure-form pure-form-alligned">
          <h2>Login</h2>
          <label>
            <input placeholder="username" type="text" value={this.state.username} onChange={this.handleChangeUsername} />
          </label>
          <br /><br />
          <label>
            <input placeholder="password" type="text" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <br /><br />
          <input type="submit" value="Login" className="pure-button pure-button-primary" />
        </form>
          <button onClick={this.handleButtonLogin} className="pure-button pure-button-active">
            Login with ethereum wallet
          </button>
        </div>
    );
  }
}