import React, { Component } from 'react';
import Login from './Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}
