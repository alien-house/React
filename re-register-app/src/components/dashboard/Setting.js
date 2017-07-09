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

	constructor(){
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {};
	}
	
	handleChange(event) {
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {

		// var email = this.state.email;
		// var password = this.state.password;

		// if (email === undefined || password === undefined){
		// 	alert('please something input');
		// 	return;
		// }
		// login(email,
		// 	password,
		// 	() => { this.setState({ redirectToReferrer: true })}
		// );
	}
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
				<dl>
					<dt>name</dt>
					<dd><input type="text" name="name" value={this.state.value} onChange={this.handleChange} /></dd>
					<dt>email</dt>
					<dd><input type="text" name="email" value={this.state.value} onChange={this.handleChange} /></dd>
				</dl>
				<button id="btn-signIn" onClick={this.handleSubmit}>Login</button>
			</div>
		);
	}

}

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });