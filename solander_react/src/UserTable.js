import React, { Component } from 'react'

	function requestOptions(props) {
	  if (!props.name) {
	   return null;
	  }

	  return (
	    <div>
	      Warning!
	    </div>
	  );
	}

export default class UserTable extends Component {
	constructor(props) {
		super(props)
		this.state = {requestCreated: false}
		this.handleUserRequest = this.handleUserRequest.bind(this)

	}

	handleUserRequest() {
		this.setState(prevState => ({
			requestCreated: !prevState.requestCreated
		}))

	}

	render() {
		return (
				<div>
				<h2>List of users registered with solander</h2>
		    		<table>
		    		   <thead>
		                <tr>
		                  <th>User ID</th>
		                  <th>Name</th>
		                  <th>Balance</th>
		                  <th>Owned Properties</th>
		                  <th></th>
		                </tr>
		               </thead>
		               <tbody>
		                <tr>
		                  <td>1</td>
		                  <td>Jeff Feng</td>
		                  <td>100 M</td>
		                  <td>None</td>
		                  <td>
		                  	<ul>
			                 <li onClick={this.handleUserRequest}>
			                 		{this.state.requestCreated ? 'Cancel Request' : 'Create Request'}
			                 </li>
		    				</ul>
		                  </td>
		                </tr>
	                	{this.state.requestCreated ? (
	                	  <tr>
			                  <td><button>PID 1</button></td>
			                  <td><button>PID 2</button></td>
			                  <td><button>PID 3</button></td>
			              </tr>
					      ) : (
					        null
					     )}
		             </tbody>
	              </table>	
	            </div>
         );
	}
}
