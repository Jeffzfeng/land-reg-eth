import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Router from "./components/Router"
import Header from "./components/Header"
import Footer from "./components/Footer"

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Router />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App
