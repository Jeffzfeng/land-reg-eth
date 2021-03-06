import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Register from './Register'
import Profile from './Profile'
import Search from './Search'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

export default class Router extends Component{

render() {
    return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/register' component={Register}/>
                <Route Path='/search' component={Search}/>
            </Switch>
        );
    }   
}
