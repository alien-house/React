import React from 'react';
import * as firebase from "firebase";
import { Auth } from '../pages/Authenticated';
export default class Dashboard extends React.Component {
	constructor(){
		super();
		// this.state = {value: 'haiteru'};
		console.log("@.^..@"+Auth.isAuthenticated);
		this.state = {};
	}
	render() {
		// console.log(this.props);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		return (
			<div>
			<h1>Dashboard</h1>
			</div>
		);
	}
}
