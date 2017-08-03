import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <p>Main</p>
        <button onClick={this.props.changeUsername}>ダメ</button>
      </div>
    );
  }
}
