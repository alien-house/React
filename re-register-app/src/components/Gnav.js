
import React, { Component } from 'react';
import { isAuthenticated, logout } from '../utils/FirebaseAuthService';
import { 
  Link,
} from 'react-router-dom'

export default class Gnav extends Component {

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/signin">SignIn</Link></li>
             {(isAuthenticated()) ? ( <li><button className="btn btn-danger log" onClick={() => logout()}>Log out </button></li> ) :  ''}
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    );
  }
}
