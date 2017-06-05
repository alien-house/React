import React from 'react';
import * as firebase from "firebase";
export default class Register extends React.Component {
	constructor(){
		super();
		// this.state = {value: 'haiteru'};
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


	render() {
		// console.log(this.props);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		return (
			<div>
				<h1>My page</h1>
			</div>
		);
	}
}
