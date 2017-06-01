import React from 'react';

export default class Archives extends React.Component {
	render() {
		console.log(this.props);
		const { query } = this.props.location;
		const { params } = this.props.match;
		const { article } = params;
		// const { date, filter } = query;
		return (
			<div>
			<h1>Archives</h1>
			<p>駒田降りしましたんがかdぇぇdpでmd</p>
			<p>{article}</p>
			</div>
		);
	}
}
