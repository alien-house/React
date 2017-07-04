import React from 'react';
import * as firebase from "firebase";
import { Redirect } from 'react-router-dom';
import { Auth } from './Authenticated';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'

// const Auth = {
// 	isAuthenticated: false,
// 	authenticate(cb) {
// 		this.isAuthenticated = true
// 		cb()
// 	},
// 	signout(cb) {
// 		this.isAuthenticated = false
// 		cb()
// 	}
// }

export default class SignIn extends React.Component {
	constructor(){
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
		    redirectToReferrer: false
		};
	}

	init(){
	}

	componentWillMount() {
		this.userWillTransfer(this.props);
	}

	userWillTransfer(props) {
		// if (!localStorage.getItem('sessionId')) {
		//   this.setState({ isAuthenticated: false });
		// } else {
		//   this.setState({ isAuthenticated: true });
		// }

		// login check!
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
 				var email = user.email;
 				console.log("@_@"+email);
 				// this.setState.email = email;
			}else{
				console.log("not yet");
			}
		});
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

		var email = this.state.email;
		var password = this.state.password;

		if (email === undefined || password === undefined){
			alert('please something input');
			return;
		}
			console.log("email:"+email);
			console.log("password:"+password);
		// var email = "info@alien-house.com";
		// var password = "testtest";
		firebase.auth().signInWithEmailAndPassword(email, password)
		   .then(function(firebaseUser) {
			   		// if it succeed, send this function to ...
					Auth.authenticate(() => {
						this.setState({ redirectToReferrer: true })
					})
					var user = firebase.auth().currentUser;
		    		var displayName = user.displayName;
	    			console.log("@"+firebaseUser);
	    			console.log("@..@"+Auth.isAuthenticated);
		    // const path = `/repos/${displayName}/`
		    // browserHistory.push(path)
			   	if (firebase.auth().currentUser) {
				} 
		   }.bind(this))
		  .catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("@"+errorCode);
			console.log("@__@"+errorMessage);
		  });
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
		const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
		console.log(this.state);
		const { redirectToReferrer } = this.state

		if (redirectToReferrer) {
		  return (
		    <Redirect to={from}/>
		  )
		}
		return (
			<div>
			<h1>SignIn</h1>
			<p>Please log in</p>
			<dl>
				<dt>email</dt>
				<dd><input type="text" name="email" value={this.state.value} onChange={this.handleChange} /></dd>
				<dt>pass</dt>
				<dd><input type="text" name="password" value={this.state.value} onChange={this.handleChange} /></dd>
			</dl>
			<button id="btn-signIn" onClick={this.handleSubmit}>ログイン</button>

			
			</div>
		);
	}

}

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });