import React from 'react';
import DBnav from './DBNav';
// import { Redirect } from 'react-router-dom';
import { updateUserProfile, getUserProfile } from '../../utils/FirebaseAuthService';
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
	
	componentWillMount(){
     	var userData = getUserProfile();
     	console.log(userData);
		this.state = userData;

	}

	componentDidMount(){
		
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

		var name = this.state.name;
		var email = this.state.email;
		var userObj = {
		    displayName: name,
		    email: email
		};
		updateUserProfile(userObj);
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
					<dt>nick name</dt>
					<dd><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></dd>
					<dt>email</dt>
					<dd><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></dd>
				</dl>
				<button id="btn-signIn" onClick={this.handleSubmit}>update</button>
			</div>
		);
	}

}

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });