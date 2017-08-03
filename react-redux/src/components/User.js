
import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

export default class User extends Component {
  render() {
    return (
      <div className="User">
        <p>User</p>
        <p>{this.props.username}</p>
      </div>
    );
  }
}
