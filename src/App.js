import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const host = 'http://localhost:4000/v1';

class App extends Component {
  state = {
    quote: ''
  };

  componentDidMount = async () => {
    const dice = 3;
    const sides = 6;
    const query = `{
      hello
      quoteOfTheDay
    }`;
    const response = await fetch(host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { dice, sides }
      })
    }).then(data => data.json());
    const {
      data: { quoteOfTheDay }
    } = response;
    this.setState({
      quote: quoteOfTheDay
    });
  };

  render() {
    const { quote } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
Welcome
          </p>
        </header>
        <h1>
Quote of the day
        </h1>
        <h2>
          {quote}
        </h2>
      </div>
    );
  }
}

export default App;
