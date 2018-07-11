import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const host = 'http://localhost:4000/v1';

class App extends Component {
  state = {
    quote: '',
    random: 0,
    rollDice: [0, 0, 0],
    login: false
  };

  componentDidMount = async () => {
    const dice = 3;
    const sides = 6;
    const query = `{
      hello
      quoteOfTheDay
      random
      rollDice(numDice:4,numSides:4)
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
      data: { quoteOfTheDay, random, rollDice }
    } = response;
    this.setState({
      quote: quoteOfTheDay,
      random,
      rollDice
    });
  };

  loginUser = () => {
    const username = 'dhaya';
    const password = '123456';
    const query = `mutation {
      login(username: $username, password: $password)
    }`;

    const response = fetch(host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { username, password }
      })
    }).then(data => data.json());

    const {
      data: { login }
    } = response;
    this.setState({
      login
    });
  };

  render() {
    const { quote, random, rollDice, login } = this.state;
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
        <h3>
This is a random number
        </h3>
        <h2>
          {random}
        </h2>
        <h5>
Dice Scores
        </h5>
        {rollDice.map((dice, i) => (
          <p key={i}>
            {dice}
          </p>
        ))}

        <h1>
Login
        </h1>
        <button onClick={this.loginUser}>
Login User
        </button>
        {login ? (
          <h1>
Logged in
          </h1>
        ) : (
          <h1>
Not logged in
          </h1>
        )}
      </div>
    );
  }
}

export default App;
