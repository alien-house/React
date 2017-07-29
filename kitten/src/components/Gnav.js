import React, { Component } from 'react';
import { isAuthenticated, logout } from '../utils/FirebaseAuthService';
import logo from '../img/logo_hori.svg';
import { 
  Link,
} from 'react-router-dom'
import './Gnav.css';

export default class Gnav extends Component {

  render() {
    const url = this.props.url
    console.log("url:"+url);
    return (
      <div className="header">
        <div className="glogo"><Link to="/"><img src={logo} className="g-logo" alt="kitten" /></Link></div>
        <nav className="gnav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
          <ul>
            <li><Link to="/dashboard" >Dashboard</Link></li>
            <li><button className="btn btn-danger log" onClick={() => logout()}>Log out </button></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/signin" >SignIn</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}
