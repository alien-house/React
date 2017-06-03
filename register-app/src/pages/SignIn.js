import React from 'react';

export default class SignIn extends React.Component {
	render() {
		console.log(this.props);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		return (
			<div>
			<h1>SignIn</h1>
			<p>Please log in</p>
			</div>
		);
	}
}
