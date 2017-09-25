import React, { Component } from 'react';
import Login from './Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.classContainer = "loginPage";
  }

  render() {
    return (
      <div className={this.classContainer}>
        <Login/>
      </div>
    );
  }
}
