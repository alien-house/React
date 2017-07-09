import React from 'react';
import DBnav from './DBNav';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Setting from "./Setting"
// import { login, logout, isLoggedIn } from '../utils/FirebaseAuthService';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'


export default class Dashboard extends React.Component {
	constructor(){
    	super();
	}
	render() {
		const match = this.props.match;
		console.log(match.url);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		   // this.state.isAuthenticated? (
     //    <Route children={this.props.children} />
     //  ) : (
    	// 		<Redirect to={'/mypage'} />
     //  )
		return (
			<div>
			<h1>Dashboard</h1>
            <DBnav url={match.url} />
			<Route path={`${match.url}/setting`} component={Setting}/>
		    <Route exact path={match.url} render={() => (
			<h3>Please select a topic.</h3>
		    )}/>
			</div>
		);
	}

}
const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

// <Route path={`${match.url}/:topicId`} component={Child}/>