import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import './App.css';

import CreateSubmission from './components/CreateSubmission';
import EnumerateEntries from './components/EnumerateEntries';
import PostPage from './components/PostPage';
import GoogleMaps from './components/GoogleMaps'

class App extends Component {
  render() {
    return (
      <Switch>
        <div>
          {/* HOMEPAGE */}
          <Route exact path='/' component={EnumerateEntries} />
          {/* SUBMISSION */}
          <Route exact path='/submit' component={CreateSubmission} />
          {/* SPECIFIC POST PAGE */}
          <Route path='/post/:id' component={PostPage} />
          {/* GOOGLE MAPS PAGE */}
          <Route path='/maps' component={GoogleMaps} />
        </div>
      </Switch>
    );
  }
}
export default App;
