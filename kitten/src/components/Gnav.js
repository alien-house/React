import React, { Component } from 'react';
import { logout } from '../utils/FirebaseAuthService';
import logo from '../img/logo_hori.svg';
import { 
  Link,
} from 'react-router-dom'
import './Gnav.css';

export default class Gnav extends Component {

  render() {
    // const url = this.props.url
    // console.log("url:"+url);
    return (
      <div className="header">
        <div className="glogo"><Link to="/"><img src={logo} className="g-logo" alt="kitten" /></Link></div>
        <nav className="gnav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>
          <ul>
            <li style={{ display: this.props.loginState ? '' : 'none' }}><button className="btn btn-danger log" onClick={() => logout()}>Log out </button></li>
            <li style={{ display: this.props.loginState ? 'none' : '' }}><Link to="/login/register">Register</Link></li>
            <li style={{ display: this.props.loginState ? 'none' : '' }}><Link to="/login/signin" >SignIn</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}
