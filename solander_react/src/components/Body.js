import React, { Component } from 'react'
import Home from "./Home"

export default class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="Body">
          <Home/ >
        </div>
    );
  }
}

