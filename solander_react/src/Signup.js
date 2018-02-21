import React, { Component } from 'react'

//import App from "./App"

export default class Signup extends Component {

	render() {
		return (
        	<main className="container">
				<h2>Signup</h2>
			      <form>
			        <label htmlFor="username">Enter username</label>
			        <input id="username" name="username" type="text" />
			        <br/>
			        <label htmlFor="email">Enter your email</label>
			        <input id="email" name="email" type="email" />
			        <br/>
			        <label htmlFor="birthdate">Enter your birth date</label>
			        <input id="birthdate" name="birthdate" type="text" />
			        <br/>
			        <button>Send data!</button>
				</form>
			</main>
		);
	}
}