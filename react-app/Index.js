import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './src/styles.css'

class Index extends Component {
  render() {
    return (
      <h1> hello world! </h1>
    )
  }
}

ReactDOM.render( < Index / > , document.getElementById('example'));