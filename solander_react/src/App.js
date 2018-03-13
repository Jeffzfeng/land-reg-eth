import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from "./components/Router"
import Header from "./components/Header"
import Footer from "./components/Footer"

class App extends Component {

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
