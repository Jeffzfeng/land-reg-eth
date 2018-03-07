import React, { Component } from 'react'

export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
    	username: '',
		password: ''
	};

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
  	this.setState({password: event.target.value});
  }

  handleLogin(event) {
  	if(this.state.username==null || this.state.username==''){
  		alert('login unsuccessful, please check input values')
  		event.preventDefault();
  	}

  	else{
    	alert('Login by ' + this.state.username + ' successful!')
    	event.preventDefault();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <label>
          username:
          <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
        </label>
        <br /><br />
        <label>
          password:
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
        </label>
        <br /><br />
        <input type="submit" value="Login" />
      </form>
    );
  }
}