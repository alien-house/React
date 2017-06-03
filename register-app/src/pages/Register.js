import React from 'react';
import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyCz4_2OhpXg6TPdYWRXnt330dRyD5q1jFA",
  authDomain: "programming-473ea.firebaseapp.com",
  databaseURL: "https://programming-473ea.firebaseio.com",
  storageBucket: "programming-473ea.appspot.com",
};
firebase.initializeApp(config);

export default class Register extends React.Component {
	constructor(){
		super();
		this.state = {
			speed: 10
		};
	}
	// only once
	componentDidMount(){

		const rootRef = firebase.database().ref().child('user');
		const userRef = rootRef.child('speed');
		userRef.on('value', snap => {
		console.log(snap);
			this.setState({
				speed: snap.val()
			});
		});
	}

	handleClick(i) {
		
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
			<p>{this.state.speed}</p>
			<dl>
				<dt>id</dt>
				<dd><input /></dd>
				<dt>pass</dt>
				<dd><input /></dd>
			</dl>
			<button>登録</button>
			</div>
		);
	}
}
