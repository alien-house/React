import React from 'react';
// import { login, isAuthenticated } from '../../utils/FirebaseAuthService';
import Register from "./Register"
import SignIn from "./SignIn"
import logo from '../../img/logo.svg';
import { 
  Route, 
  Switch,
  NavLink
} from 'react-router-dom'
import './Login.css';

export default class Index extends React.Component {
	componentWillMount() {
		console.log("Login Index");
	}
	render() {
		return (
			<div className="login-wrap">
				<div><img src={logo} className="app-logo" alt="kitten" /></div>
				<div className="login-box">
					<ul className="switch-list">
						<li><NavLink activeClassName="active" to="/login/register">Register</NavLink></li>
						<li><NavLink activeClassName="active" to="/login/signin" >SignIn</NavLink></li>
					</ul>
					<Switch>
						<Route path="/login/register" name="register"  component={Register}/>
						<Route path="/login/signin" name="signin" component={SignIn}/>
					</Switch>
				</div>
			</div>
		);
	}
}
