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
          var asc_fname, asc_lname, asc_bdate;
          var fname, lname, bdate;

          // remove insignificant trailing zeroes
          asc_fname = result[0].replace(/0+$/g, "")
          asc_lname = result[1].replace(/0+$/g, "")
          asc_bdate = result[2].replace(/0+$/g, "")

          // convert to ASCII
          fname = this.state.web3.toAscii(asc_fname)
          lname = this.state.web3.toAscii(asc_lname)
          bdate = this.state.web3.toAscii(asc_bdate)

          console.log("logged in with account ", accounts[0])
          console.log(fname)
          console.log(lname)
          console.log(bdate)

          alert("Welcome back !", fname)
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