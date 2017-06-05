import React from 'react';
import * as firebase from "firebase";

export default class SignIn extends React.Component {
	constructor(){
		super();
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {};
	}

	init(){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
 				var email = user.email;
 				console.log("@_@"+email);
 				this.setState.email = email;
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

		// var user = firebase.auth().currentUser;

// if (user) {
// 				alert('いるよんん');
// } else {
// 				alert('madaoowann！！');
// }

		var email = this.state.email;
		var password = this.state.password;

		if (email === undefined || password === undefined){
			alert('please something input');
			return;
		}
		// var email = "info@alien-house.com";
		// var password = "testtest";
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
			console.log("@"+errorCode);
			console.log("@@"+errorMessage);
		});
		if (firebase.auth().currentUser) {

			var user = firebase.auth().currentUser;
			// 	alert('もういろもん');
 		// 		var newemail = user.email;
			// 	user.updateProfile({
			// 		displayName:'ekokokokomi' 
			// 	}).then(function() {
 		// 			console.log("scuseeeees");
			// 	}, function(error) {
 		// 			console.log("nonononono");
			// 	});
 		// 		console.log("@@"+newemail);
 		// 		this.setState.email = newemail;


    		var displayName = user.displayName;
    			console.log("@@"+displayName);
		} 


		// if (firebase.auth().currentUser) {
		// 	// firebase.auth().signOut();
		// 		alert('もういろもん');
		// } else {

		// 	var email = this.state.email;
		// 	var password = this.state.password;
		// 		console.log(email);
		// 		console.log(password);
		// 	if (email === undefined || password === undefined){
		// 		alert('please enter something');
		// 		return;
		// 	}
		// 	if (email.length < 4) {
		// 		alert('Please enter an email addressed.');
		// 		return;
		// 	}
		// 	if (password.length < 4) {
		// 		alert('Please enter a password.');
		// 		return;
		// 	}
		// 	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// 		// Handle Errors here.
		// 		var errorCode = error.code;
		// 		var errorMessage = error.message;
		// 		if (errorCode === 'auth/wrong-password') {
		// 			alert('Wrong password.');
		// 		} else {
		// 		alert('っっっっっd');
		// 			alert(errorMessage);
		// 		}
		// 		console.log("@"+errorCode);
		// 		console.log(error);
		// 	});

		// 	if (firebase.auth().currentUser) {
		// 		console.log("いるよ");
		// 	}
		// 	// event.preventDefault();
		// }
	}

	render() {
		// console.log(this.props);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
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

			<p>email:{this.state.email}</p>
			</div>
		);
	}
}
