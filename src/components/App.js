import React, { Component } from 'react'
import logo from '../logo.png'
import BookList from './BookList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <BookList />
      </div>
    )
  }
}

export default App
