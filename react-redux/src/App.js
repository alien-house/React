import Main from './components/Main';
import User from './components/User';

import React, { Component } from 'react';
import { connect } from "react-redux";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    console.log("props: ", this.props);
    return (
      <div className="App">
        <Main changeUsername={() => this.props.setName("Anna")} />
        <User username={this.props.user.name} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    math: state.math
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch({
        type: "SET_NAME",
        payload: name
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
