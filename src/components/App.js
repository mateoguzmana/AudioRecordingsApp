import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import RecordingsList from './RecordingsList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/recordings' component={RecordingsList} />
      </Switch>
    );
  }
}
