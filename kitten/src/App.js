import React, { Component } from 'react';
import Gnav from './components/Gnav';
import Login from "./components/login/Index"
import Dashboard from "./components/dashboard/Index"
import DBnav from './components/dashboard/DBNav';
import Jobs from "./components/jobs/Jobs"
import Events from "./components/events/Events"
import { requireAuth, isAuthenticated } from './utils/FirebaseAuthService';

import {
	BrowserRouter as Router,
	Route,
	Redirect,
	browserHistory
} from 'react-router-dom'
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			uid: null
		};
		const getIsLogin = (uid) => {
			this.setState({ uid: uid });
		}
		requireAuth(getIsLogin);
		// console.log("only one time <3");
	}
	// componentWillMount() {
	// 	if(this.state.uid){
	// 		console.log("tルエ");
	// 		console.log(this.state.uid);
	// 	}else{
	// 		console.log("de");
	// 		console.log(this.state.uid);
	// 	}
	// 	console.log("IndexIndexIndex",this.state.uid ? 'none' : 'e');
	// }
	render() {
		return (
			<Router history={browserHistory}>
				<div className="App">
					<Gnav loginState={this.state.uid} />
					<div className="container">
						<DBnav loginState={this.state.uid} url={"/dashboard"} />
						<div className="dashboard-content">
							<PrivateRoute path="/dashboard" component={Dashboard} />
							<PrivateRoute path="/"  name="home" component={Dashboard} />
							<Route path="/jobs" name="jobs" component={Jobs} />
							<Route path="/events" name="events" component={Events} />
							<Route path="/login" name="login" component={Login} />
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render = { props => (
		isAuthenticated() ? (
			<Component {...props} />
		) : (
				<Redirect to={{
					pathname: '/login/signin',
					state: { from: props.location }
				}} />
			)
	)} />
)
export default App;
