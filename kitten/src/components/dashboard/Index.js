import React from 'react';
import { login, isAuthenticated } from '../../utils/FirebaseAuthService';
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
import { withRouter } from 'react-router'
import './Dashboard.css';
import Dashboard from "./Dashboard"
import Messages from "./Messages"
import Resume from "./Resume"
import Projects from "./Projects"
import Tasks from "./Tasks"
import Setting from "./Setting"

export default class Index extends React.Component {
	componentWillMount() {
		console.log("IndexIndexIndex");
	}
	render() {
		const match = this.props.match;
		console.log(match.url);
		return (
				<Switch>
					<Route path={`${match.url}`} exact component={Dashboard}/>
					<Route path={`${match.url}/messages`} component={Messages}/>
					<Route path={`${match.url}/resume`} component={Resume}/>
					<Route path={`${match.url}/projects`} component={Projects}/>
					<Route path={`${match.url}/tasks`} component={Tasks}/>
					<Route path={`${match.url}/setting`} component={Setting}/>
				    <Route path={match.url} render={() => (
					<h3>Please select a topic.</h3>
				    )}/>
				</Switch>
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