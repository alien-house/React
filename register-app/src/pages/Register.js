import React from 'react';
import * as firebase from "firebase";
export default class Register extends React.Component {
	constructor(){
		super();
		// this.state = {value: 'haiteru'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {};
	}
	// only once
	componentDidMount(){

		// const rootRef = firebase.database().ref().child('user');
		// const userRef = rootRef.child('speed');
		// userRef.on('value', snap => {
		// // console.log(snap);
		// 	this.setState({
		// 		speed: snap.val()
		// 	});
		// });
	}

	// handleClick(i) {
		
	// }

	handleChange(event) {
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
		this.setState({
			[name]: value
		});
		// console.log(this.state);
		// console.log(this.state.email);
		// this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		// console.log('An essay was submitted: ' + this.state.value);
		var email = this.state.email;
		var password = this.state.password;
		if (email === undefined || password === undefined){
			alert('.');
			return;
		}
		if (email.length < 4) {
			alert('Please enter an email addressed.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/weak-password') {
				alert('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			// [END_EXCLUDE]
		});

		event.preventDefault();

	}

	render() {
		// console.log(this.props);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		return (
			<div>
			<h1>Register</h1>
			<form onSubmit={this.handleSubmit}>
			<dl>
				<dt>email</dt>
				<dd><input type="text" name="email" value={this.state.value} onChange={this.handleChange} /></dd>
				<dt>pass</dt>
				<dd><input type="text" name="password" value={this.state.value} onChange={this.handleChange} /></dd>
			</dl>
			<button>登録</button>
			</form>
			</div>
		);
	}
}
