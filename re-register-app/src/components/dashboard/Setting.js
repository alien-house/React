import React from 'react';
import DBnav from './DBNav';
// import { Redirect } from 'react-router-dom';
// import { login, logout, isLoggedIn } from '../utils/FirebaseAuthService';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'


export default class Setting extends React.Component {

	render() {
		// console.log(this.props);
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
			<h1>Setting</h1>
            <DBnav />
			
			</div>
		);
	}

}

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });