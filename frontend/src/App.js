import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import './App.css';

import CreateSubmission from './components/CreateSubmission';
import EnumerateEntries from './components/EnumerateEntries';

class App extends Component {
  render() {
    return (
      <Switch>
        <div>
          {/* HOMEPAGE */}
          <Route exact path='/' component={EnumerateEntries} />
          {/* SUBMISSION */}
          <Route exact path='/submit' component={CreateSubmission} />
        </div>
      </Switch>
    );
  }
}
export default App;
