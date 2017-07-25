import React from 'react';
import { login, isAuthenticated } from '../../utils/FirebaseAuthService';
import Register from "./Register"
import SignIn from "./SignIn"
import { CSSTransitionGroup } from 'react-transition-group'
import logo from '../../img/logo.svg';
import { 
  BrowserRouter as Router,
  Route, 
  Link,
  Redirect,
  browserHistory,
  Switch,
  NavLink
} from 'react-router-dom'
import { withRouter } from 'react-router'
import './Login.css';

export default class Index extends React.Component {
	componentWillMount() {
		console.log("IndexIndexIndex");
	}
	render() {
    	this.state = {items: ['hello', 'world', 'click', 'me']};
		this.state = {
			pagePath : ["register","signin"],
			componentPage : [Register,SignIn]
		};
		return (
			<div className="login-wrap">
				<div><img src={logo} className="app-logo" alt="kitten" /></div>
				<div className="login-box">
					<ul className="switch-list">
						<li><NavLink activeClassName="active" to="/register">Register</NavLink></li>
						<li><NavLink activeClassName="active" to="/signin" >SignIn</NavLink></li>
					</ul>
					<Switch>
						<Route path="/register" name="register" component={Register}/>
						<Route path="/signin" name="signin" component={SignIn}/>
					</Switch>
				</div>
			</div>
		);
	}
}


// <CSSTransitionGroup
// transitionName="fade"
// transitionEnterTimeout={300}
// transitionLeaveTimeout={300}
// >
// </CSSTransitionGroup>
// <Route path="/register" name="register" component={Register}/>
// 								<Route path="/signin" name="signin" component={SignIn}/>