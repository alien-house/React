import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
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
				<h1 className="dashboard-title">Dashboard</h1>
				<div>
					
				</div>
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