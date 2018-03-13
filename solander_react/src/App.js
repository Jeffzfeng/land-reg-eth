import React, { Component } from 'react'
import Body from "./components/Body"
import Header from "./components/Header"
import Footer from "./components/Footer"

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App
