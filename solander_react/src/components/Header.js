import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../App.css'

export default class Header extends Component {

  render() {
    return (
        <div className="header">
            <nav className="navbar pure-menu pure-menu-horizontal">
                <a href="#" className="pure-menu-heading ">Solander: A Blockchain Land Registry</a>    
                <div className="navButtons">   
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/transfer'>Land Transfer</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}

