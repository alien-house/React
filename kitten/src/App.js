import React, { Component } from 'react';
// import Gnav from './components/Gnav';
import Login from "./components/login/Index"
import { CSSTransitionGroup } from 'react-transition-group'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
