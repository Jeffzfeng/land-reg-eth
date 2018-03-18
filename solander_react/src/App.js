import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from "./components/Router"
import Header from "./components/Header"

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Router />
        </div>
      </BrowserRouter>
    );
  }
}

export default App
