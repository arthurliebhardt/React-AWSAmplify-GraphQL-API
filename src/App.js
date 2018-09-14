import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API, graphqlOperation} from 'aws-amplify'

const query = `
  query {
    listRestaurants {
      items {
        id name description location
      }
    }
  }
`

class App extends Component {
  state = { restaurants: []}
  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(query))
    this.setState({
      restaurants: data.data.listRestaurants.items
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.restaurants.map((restaurant, index) => (
            <p key={index}>{restaurant.name}</p>
          ))
        }
      </div>
    );
  }
}

export default App;
