import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../App.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'



export default class Header extends Component {

  render() {
    return (
        <div className="header">
            <nav className="topnav">
                 <ul>
                    <li><Link to='/'><i className="fa fa-institution"></i><br/>Home</Link></li>
                    <li><Link to='/profile'><i className="fa fa-user-circle"></i><br/>Profile</Link></li>
                    <li><Link to='/register'><i className="fa fa-clipboard"></i><br/>Register</Link></li>
                    <li><Link to='/transfer'><i className="fa fa-share"></i><br/>Transfer</Link></li>
                </ul>
            </nav>
        </div>
    );
  }
}

