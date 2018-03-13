import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../App.css'

export default class Header extends Component {

  render() {
    return (
            <nav className="navbar pure-menu pure-menu-horizontal">
                <a href="#" className="pure-menu-heading pure-menu-link">Solander: A Blockchain Land Registry</a>
                    <ul>        
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </ul>
            </nav>
    );
  }
}

