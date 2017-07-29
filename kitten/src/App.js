import React, { Component } from 'react';
import Gnav from './components/Gnav';
import Login from "./components/login/Index"
import Dashboard from "./components/dashboard/Index"
import DBnav from './components/dashboard/DBNav';
import Jobs from "./components/jobs/Jobs"
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

		const match = this.props.match;
    return (
		<Router history={browserHistory}>
			<div className="App">
				<Gnav />
				<div className="container">
	        		<DBnav url={"dashboard"} />
	        		<div className="dashboard-content">
						<PrivateRoute path="/dashboard" component={Dashboard}/>
						<Route path="/jobs" name="jobs" component={Jobs}/>
					</div>
					<Route path="/signin" name="signin" component={Login}/>
				</div>
			</div>
		</Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
export default App;
