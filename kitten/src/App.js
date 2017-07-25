import React, { Component } from 'react';
import Gnav from './components/Gnav';
import Login from "./components/login/Index"
import Dashboard from "./components/dashboard/Index"
import { requireAuth, isAuthenticated } from './utils/FirebaseAuthService';
import { CSSTransitionGroup } from 'react-transition-group'
import { 
  BrowserRouter as Router,
  Route, 
  Link,
  Redirect,
  browserHistory,
  Switch,
  NavLink
} from 'react-router-dom'
import './App.css';

class App extends Component {
	constructor(){
	super();
	this.state = {
		uid: null
	};
	const getIsLogin = (uid) => {
		this.setState({uid:uid});
	}
	requireAuth(getIsLogin);
	// console.log("only one time <3");
	}
	componentWillMount() {
		console.log("App da");
	}
  render() {
    return (
		<Router history={browserHistory}>
			<div className="App">
				<Gnav />
				{isAuthenticated() ?
				(<Route path="/dashboard" name="home" component={Dashboard}/>):(<Login />)
				}
				
			</div>
		</Router>
    );
  }
}

export default App;
