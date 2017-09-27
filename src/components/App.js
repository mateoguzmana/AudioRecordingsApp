import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import RecordingsList from './RecordingsList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.checkToken = this.checkToken.bind(this);
  }

  checkToken() {
    if(localStorage.getItem("userToken") !== "") {
        return RecordingsList;
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/recordings' component={this.checkToken()} />
      </Switch>
    );
  }
}
